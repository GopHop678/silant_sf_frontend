import {useState, useRef, useEffect} from "react";
import '../assets/css/mainPage.css';
import {API_URL} from "../App.jsx";


const AddNewBtn = ({clientRole, currentTab}) => {
    const [displayButton, setDisplayButton] = useState(false);
    const goToCreatePage = () => {
        window.open(`/?page=new&type=${currentTab}`, '_self');
    }

    const renderBtn = () => {
        setDisplayButton(false);
        if (currentTab === 'machine') {
            if (clientRole === 'manager') {
                setDisplayButton(true);
            }
        } else if ( currentTab === 'maintenance') {
            if (['client', 'service', 'manager'].includes(clientRole)) {
                setDisplayButton(true);
            }
        } else if ( currentTab === 'complaint') {
            if (['service', 'manager'].includes(clientRole)) {
                setDisplayButton(true);
            }
        } else {
            setDisplayButton(false);
        }
    }

    useEffect(() => {
        renderBtn();
    }, [currentTab, clientRole]);
    return (
        <>{displayButton &&
        <button className='add-new-btn' onClick={goToCreatePage}>+ Добавить</button>}</>
    )
}


// const MainTable = ({clientRole}) => {
const MainTable = ({clientRole, currentTab, setCurrentTab}) => {
        const machinesTab = useRef(null);
    const maintenanceTab = useRef(null);
    const complaintsTab = useRef(null);
    const [tableData, setTableData] = useState(
        <div className='table-loading'>Загрузка...</div>
    );
    const [tableFilter, setTableFilter] = useState(null);
    // const [currentTab, setCurrentTab] = useState('machine');
    const selectedMachineNumber = useRef(null);
    const selectedEngine = useRef(null);
    const selectedTransmission = useRef(null);
    const selectedDriveAxle = useRef(null);
    const selectedSteeringAxle = useRef(null);
    const selectedMaintenanceType = useRef(null);
    const selectedServiceCompany = useRef(null);
    const selectedFailureNode = useRef(null);
    const selectedRecoveryMethod = useRef(null);
    const token = localStorage.getItem('authToken');

    const showCard = (type, id) => {
        window.open(`/?page=card&type=${type}&id=${id}`, '_blank');
    }

    const switchMachines = async () => {
        machinesTab.current?.classList.add('active');
        maintenanceTab.current?.classList.remove('active');
        complaintsTab.current?.classList.remove('active');
        setTableData(<div className='table-loading'>Загрузка...</div>);

        const machineSearchParams = new URLSearchParams({
            machineFactoryNumber: selectedMachineNumber.current?.value,
            engine: selectedEngine.current?.value,
            transmission: selectedTransmission.current?.value,
            driveAxle: selectedDriveAxle.current?.value,
            steeringAxle: selectedSteeringAxle.current?.value
        });

        let response = await fetch(
            `${API_URL}/machines?${machineSearchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        let data = await response.json();
        const newTableData = (
            <table className="table-main">
                <thead>
                <tr>
                    <th>Зав. № машины</th>
                    <th>Модель машины</th>
                    <th>Двигатель</th>
                    <th>Трансмиссия</th>
                    <th>Ведущий мост</th>
                    <th>Управляющий мост</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}
                        onClick={() => showCard('machine', item['id'])}>
                        <td>{item['machine_factory_number']}</td>
                        <td>{item['machine_model']['name']}</td>
                        <td>{item['engine']['engine_model']['name']}</td>
                        <td>{item['transmission']['transmission_model']['name']}</td>
                        <td>{item['drive_axle']['drive_axle_model']['name']}</td>
                        <td>{item['steering_axle']['steering_axle_model']['name']}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
        setTableData(newTableData);

        response = await fetch(
            `${API_URL}/machine_parts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        data = await response.json();
        const newForm =
            <form onSubmit={e => e.preventDefault()} className='filter-form'>
                <div className='form-fields-wrapper'>
                    <div className='form-block machine-number-block'>
                        <label>Зав. № машины:</label>
                        <input ref={selectedMachineNumber} onChange={switchMachines}></input>
                    </div>
                    <div className='form-block engine-block'>
                        <label>Двигатель:</label>
                        <select ref={selectedEngine} onChange={switchMachines}>
                            <option value=''>Все</option>
                            {data['engines'].map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-block transmission-block'>
                        <label>Трансмиссия:</label>
                        <select ref={selectedTransmission} onChange={switchMachines}>
                            <option value=''>Все</option>
                            {data['transmissions'].map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-block drive-axle-block'>
                        <label>Ведущий мост:</label>
                        <select ref={selectedDriveAxle} onChange={switchMachines}>
                            <option value=''>Все</option>
                            {data['drive_axles'].map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-block steering-axle-block'>
                        <label>Управляющий мост:</label>
                        <select ref={selectedSteeringAxle} onChange={switchMachines}>
                            <option value=''>Все</option>
                            {data['steering_axles'].map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
    setTableFilter(newForm);
    };

    const switchMaintenance = async () => {
        machinesTab.current?.classList.remove('active');
        maintenanceTab.current?.classList.add('active');
        complaintsTab.current?.classList.remove('active');
        setTableData(<div className='table-loading'>Загрузка...</div>);

        const maintenanceSearchParams = new URLSearchParams({
            machineFactoryNumber: selectedMachineNumber.current?.value,
            maintenanceType: selectedMaintenanceType.current?.value,
            serviceCompany: selectedServiceCompany.current?.value
        });

        let response = await fetch(
            `${API_URL}/maintenance?${maintenanceSearchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        let data = await response.json();
        const newTableData = (
            <table className="table-main">
                <thead>
                <tr>
                    <th>Зав. № машины</th>
                    <th>Тип ТО</th>
                    <th>Дата ТО</th>
                    <th>Наработка м/час</th>
                    <th>№ заказ-наряда</th>
                    <th>Дата заказ-наряда</th>
                    <th>Организация, проводившая ТО</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}
                        onClick={() => showCard('maintenance', item['id'])}>
                        <td>{item['machine']['machine_factory_number']}</td>
                        <td>{item['maintenance_type']['name']}</td>
                        <td>{item['maintenance_date']}</td>
                        <td>{item['operating_time']}</td>
                        <td>{item['work_order_number']}</td>
                        <td>{item['work_order_date']}</td>
                        <td>{item['machine']['shipment_contract']['service_company']['name']}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
        setTableData(newTableData);
        response = await fetch(
            `${API_URL}/maintenance_filter`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        data = await response.json();
        const newForm =
            <form onSubmit={e => e.preventDefault()} className='filter-form'>
                <div className='form-fields-wrapper'>
                    <div className='form-block machine-number-block'>
                        <label>Зав. № машины:</label>
                        <input ref={selectedMachineNumber} onChange={switchMaintenance}></input>
                    </div>
                    <div className='form-block maintenance-type-block'>
                        <label>Тип ТО:</label>
                        <select ref={selectedMaintenanceType} onChange={switchMaintenance}>
                            <option value=''>Все</option>
                            {data['maintenance_types'].map((item, index) => (
                                <option key={index+100} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-block service-company-block'>
                        <label>Сервисная компания:</label>
                        <select ref={selectedServiceCompany} onChange={switchMaintenance}>
                            <option value=''>Все</option>
                            {data['service_companies'].map((item, index) => (
                                <option key={index+100} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
        setTableFilter(newForm);
    };

    const switchComplaints = async () => {
        machinesTab.current?.classList.remove('active');
        maintenanceTab.current?.classList.remove('active');
        complaintsTab.current?.classList.add('active');
        setTableData(<div className='table-loading'>Загрузка...</div>);

        const complaintsSearchParams = new URLSearchParams({
            machineFactoryNumber: selectedMachineNumber.current?.value,
            failureNode: selectedFailureNode.current?.value,
            recoveryMethod: selectedRecoveryMethod.current?.value,
            serviceCompany: selectedServiceCompany.current?.value
        });

        let response = await fetch(
            `${API_URL}/complaints?${complaintsSearchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        let data = await response.json();
        const newTableData = (
            <table className="table-main">
                <thead>
                <tr>
                    <th>Зав. № машины</th>
                    <th>Дата отказа</th>
                    <th>Наработка, м/час</th>
                    <th>Узел отказа</th>
                    <th>Описание отказа</th>
                    <th>Способ восстановления</th>
                    <th>Запасные части</th>
                    <th>Дата восстановления</th>
                    <th>Дней простоя</th>
                    <th>Сервисная компания</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}
                        onClick={() => showCard('complaint', item['id'])}>
                        <td>{item['machine']['machine_factory_number']}</td>
                        <td>{item['failure_date']}</td>
                        <td>{item['operating_time']}</td>
                        <td>{item['failure_node']['name']}</td>
                        <td>{item['failure_description']}</td>
                        <td>{item['recovery_method']['name']}</td>
                        <td>{item['spare_parts']}</td>
                        <td>{item['recovery_date']}</td>
                        <td>{item['downtime']}</td>
                        <td>{item['machine']['shipment_contract']['service_company']['name']}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
        setTableData(newTableData);

        response = await fetch(
            `${API_URL}/complaints_filter`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        data = await response.json();
        const newForm =
            <form onSubmit={e => e.preventDefault()} className='filter-form'>
                <div className='form-fields-wrapper'>
                    <div className='form-block machine-number-block'>
                        <label>Зав. № машины:</label>
                        <input ref={selectedMachineNumber} onChange={switchComplaints}></input>
                    </div>
                    <div className='form-block failure-node-block'>
                        <label>Узел отказа:</label>
                        <select ref={selectedFailureNode} onChange={switchComplaints}>
                            <option value=''>Все</option>
                            {data['failure_nodes'].map((item, index) => (
                                <option key={index + 200} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-block recovery-method-block'>
                        <label>Метод восстановления:</label>
                        <select ref={selectedRecoveryMethod} onChange={switchComplaints}>
                            <option value=''>Все</option>
                            {data['recovery_methods'].map((item, index) => (
                                <option key={index + 200} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-block service-company-block'>
                        <label>Сервисная компания:</label>
                        <select ref={selectedServiceCompany} onChange={switchComplaints}>
                            <option value=''>Все</option>
                            {data['service_companies'].map((item, index) => (
                                <option key={index + 200} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
    setTableFilter(newForm);
    };

    useEffect(() => {
        switchMachines();
    }, [clientRole]);

    return(
        <div>
            {clientRole ? (
                <div className='table-tabs'>
                    <div className='table-tab' ref={machinesTab}
                         onClick={() =>
                             [switchMachines(), setCurrentTab('machine')]}>
                        Общая информация
                    </div>
                    <div className='table-tab' ref={maintenanceTab}
                         onClick={() =>
                             [switchMaintenance(), setCurrentTab('maintenance')]}>
                        ТО
                    </div>
                    <div className='table-tab' ref={complaintsTab}
                         onClick={() =>
                             [switchComplaints(), setCurrentTab('complaint')]}>
                        Рекламации
                    </div>
                </div>
            ) : (
                <div className='table-tabs'>
                    <div className='table-tab' ref={machinesTab}
                         onClick={switchMachines}>
                        Общая информация
                    </div>
                </div>
            )}
            <div className="table-wrapper">
                {tableFilter}
                <div className="table-scroll-container">
                    <div className='table-window'>
                        {tableData}
                    </div>
                </div>
                <AddNewBtn currentTab={currentTab} clientRole={clientRole} />
            </div>
        </div>
    );
};


const MainPage = ({clientName, clientRole}) => {
    const [currentTab, setCurrentTab] = useState('machine');

    return (
        <div className='main-page-content'>
            {clientName ? (<p className={'client-info'}>{clientName}</p>) : null}
            {currentTab === 'machine' &&
                <p className='table-entry'>
                    Информация о комплектации и технических характеристиках Вашей техники
                </p>
            }
            {currentTab === 'maintenance' &&
                <p className='table-entry'>
                    Информация о проведенных ТО Вашей техники
                </p>
            }
            {currentTab === 'complaint' &&
                <p className='table-entry'>
                    Информация о рекламациях по Вашей техники
                </p>
            }

            <MainTable
                clientRole={clientRole}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
            />
        </div>
        )
    }


export {MainPage}