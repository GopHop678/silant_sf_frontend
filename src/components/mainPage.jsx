import {useState, useRef, useEffect} from "react";
import '../assets/css/mainPage.css';
import {API_URL} from "../App.jsx";


const openCard = (cardType, id) => {
    window.open(`/?page=card&type=${cardType}&id=${id}`, '_blank');
}


const AddNewBtn = ({clientRole, currentTab}) => {
    const [displayButton, setDisplayButton] = useState(false);
    const goToCreatePage = () => {
        window.open(`/?page=new&type=${currentTab}`, '_self');
    }

    const renderBtn = () => {
        setDisplayButton(false);
        if (currentTab === 'machines') {
            if (clientRole === 'manager') {
                setDisplayButton(true);
            }
        } else if ( currentTab === 'maintenance') {
            if (['client', 'service', 'manager'].includes(clientRole)) {
                setDisplayButton(true);
            }
        } else if ( currentTab === 'complaints') {
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


const ComplaintsTab = () => {
    const [filterData, setFilterData] = useState({});
    const [tableData, setTableData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const selectedMachineNumber = useRef(null);
    const selectedFailureNode = useRef(null);
    const selectedRecoveryMethod = useRef(null);
    const selectedServiceCompany = useRef(null);
    const token = localStorage.getItem('authToken');

    const loadTableData = async () => {
        const complaintsSearchParams = new URLSearchParams({
            machineFactoryNumber: selectedMachineNumber.current?.value,
            failureNode: selectedFailureNode.current?.value,
            recoveryMethod: selectedRecoveryMethod.current?.value,
            serviceCompany: selectedServiceCompany.current?.value
        });

        const response = await fetch(
            `${API_URL}/complaints?${complaintsSearchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        const data = await response.json();
        setTableData(data);
    }
    const loadFilterData = async () => {
        const response = await fetch(
            `${API_URL}/complaints_filter`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        const data = await response.json();
        setFilterData(data);
    }

    useEffect(() => {
        const loadTable = async () => {
            await loadFilterData();
            await loadTableData();
            setIsLoading(false);
        }
        loadTable();
    }, []);
    return (
        <div className='table-n-filter-wrapper'>
            {!isLoading ? (
                <>
                    <form
                        onSubmit={e => e.preventDefault()}
                        className='filter-form'>
                        <div className='form-fields-wrapper'>
                            <div className='form-block'>
                                <label>Зав. № машины:</label>
                                <select name='machine_model' ref={selectedMachineNumber}
                                        onChange={loadTableData}>
                                    <option value=''>Все</option>
                                    {filterData['machines'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-block'>
                                <label>Узел отказа:</label>
                                <select name='failure_node' ref={selectedFailureNode}
                                        onChange={loadTableData}>
                                    <option value=''>Все</option>
                                    {filterData['failure_nodes'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-block'>
                                <label>Метод восстановления:</label>
                                <select name='recovery_method' ref={selectedRecoveryMethod}
                                        onChange={loadTableData}>
                                    <option value=''>Все</option>
                                    {filterData['recovery_methods'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-block'>
                                <label>Сервисная компания:</label>
                                <select name='service_companie' ref={selectedServiceCompany}
                                        onChange={loadTableData}>
                                    <option value=''>Все</option>
                                    {filterData['service_companies'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className='table-wrapper'>
                        <div className='table-window'>
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
                                {tableData.map((item, index) => (
                                    <tr key={index} onClick={() =>
                                        openCard('complaints', item['id'])}>
                                        <td>{item['machine']['machine_factory_number']}</td>
                                        <td>{item['failure_date'].split('-').reverse().join('.')}</td>
                                        <td>{item['operating_time']}</td>
                                        <td>{item['failure_node']['name']}</td>
                                        <td>{item['failure_description']}</td>
                                        <td>{item['recovery_method']['name']}</td>
                                        <td>{item['spare_parts']}</td>
                                        <td>{item['recovery_date'].split('-').reverse().join('.')}</td>
                                        <td>{item['downtime']}</td>
                                        <td>{item['machine']['shipment_contract']['service_company']['name']}</td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className='loading'>Загрузка...</div>
            )
            }
        </div>
    )
}


const MaintenanceTab = () => {
    const [filterData, setFilterData] = useState({});
    const [tableData, setTableData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const selectedMachineNumber = useRef(null);
    const selectedMaintenanceType = useRef(null);
    const selectedServiceCompany = useRef(null);
    const token = localStorage.getItem('authToken');

    const loadTableData = async () => {
        const maintenanceSearchParams = new URLSearchParams({
            machineFactoryNumber: selectedMachineNumber.current?.value,
            maintenanceType: selectedMaintenanceType.current?.value,
            serviceCompany: selectedServiceCompany.current?.value
        });

        const response = await fetch(
            `${API_URL}/maintenance?${maintenanceSearchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        const data = await response.json();
        setTableData(data);
    }
    const loadFilterData = async () => {
        const response = await fetch(
            `${API_URL}/maintenance_filter`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        const data = await response.json();
        setFilterData(data);
    }

    useEffect(() => {
        const loadTable = async () => {
            await loadFilterData();
            await loadTableData();
            setIsLoading(false);
        }
        loadTable();
    }, []);
    return (
        <div className='table-n-filter-wrapper'>
            {!isLoading ? (
                <>
                    <form onSubmit={e =>
                        e.preventDefault()} className='filter-form'>
                        <div className='form-fields-wrapper'>
                            <div className='form-block'>
                                <label>Зав. № машины:</label>
                                <select name='machine_model' ref={selectedMachineNumber}
                                        onChange={loadTableData}>
                                    <option value=''>Все</option>
                                    {filterData['machines'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-block'>
                                <label>Тип ТО:</label>
                                <select name='maintenance_type' ref={selectedMaintenanceType}
                                        onChange={loadTableData}>
                                    <option value=''>Все</option>
                                    {filterData['maintenance_types'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-block'>
                                <label>Сервисная компания:</label>
                                <select name='service_companie' ref={selectedServiceCompany}
                                        onChange={loadTableData}>
                                    <option value=''>Все</option>
                                    {filterData['service_companies'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className='table-wrapper'>
                        <div className='table-window'>
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
                            {tableData.map((item, index) => (
                                <tr key={index} onClick={() =>
                                    openCard('maintenance', item['id'])}>
                                    <td>{item['machine']['machine_factory_number']}</td>
                                    <td>{item['maintenance_type']['name']}</td>
                                    <td>{item['maintenance_date'].split('-').reverse().join('.')}</td>
                                    <td>{item['operating_time']}</td>
                                    <td>{item['work_order_number']}</td>
                                    <td>{item['work_order_date'].split('-').reverse().join('.')}</td>
                                    <td>{item['machine']['shipment_contract']['service_company']['name']}</td>
                                </tr>
                            ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className='loading'>Загрузка...</div>
            )
            }
        </div>
    )
}


const MachinesTab = () => {
    const [filterData, setFilterData] = useState({});
    const [tableData, setTableData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const selectedMachineNumber = useRef(null);
    const selectedEngine = useRef(null);
    const selectedTransmission = useRef(null);
    const selectedDriveAxle = useRef(null);
    const selectedSteeringAxle = useRef(null);

    const loadTableData = async () => {
        const machineSearchParams = new URLSearchParams({
            machineFactoryNumber: selectedMachineNumber.current?.value,
            engine: selectedEngine.current?.value,
            transmission: selectedTransmission.current?.value,
            driveAxle: selectedDriveAxle.current?.value,
            steeringAxle: selectedSteeringAxle.current?.value
        });

        const response = await fetch(
            `${API_URL}/machines?${machineSearchParams.toString()}`, {
            // `${API_URL}/machines`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        const data = await response.json();
        setTableData(data);
    }
    const loadFilterData = async () => {
        const response = await fetch(
            `${API_URL}/machine_parts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        const data = await response.json();
        setFilterData(data);
    }

    useEffect(() => {
        const loadTable = async () => {
            await loadFilterData();
            await loadTableData();
            setIsLoading(false);
        }
        loadTable();
    }, [])
    return (

        <div className='table-n-filter-wrapper'>
            {!isLoading ? (
                <>
                    <form onSubmit={e =>
                        e.preventDefault()} className='filter-form'>
                        <div className='form-fields-wrapper'>
                            <div className='form-block'>
                                <label>Зав. № машины:</label>
                                <input name='machine_number' ref={selectedMachineNumber}
                                        onChange={loadTableData}/>
                            </div>
                            <div className='form-block'>
                                <label>Двигатель:</label>
                                <select name='engine_model' ref={selectedEngine}
                                        onChange={loadTableData}>
                                    <option value=''>Все</option>
                                    {filterData['engines'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-block'>
                                <label>Трансмиссия:</label>
                                <select name='transmission_model' ref={selectedTransmission}
                                        onChange={loadTableData}>
                                    <option value=''>Все</option>
                                    {filterData['transmissions'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-block'>
                                <label>Ведущий мост:</label>
                                <select name='drive_axle_model' ref={selectedDriveAxle}
                                        onChange={loadTableData}>
                                    <option value=''>Все</option>
                                    {filterData['drive_axles'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-block steering-axle-block'>
                                <label>Управляющий мост:</label>
                                <select name='steering_axle_model' ref={selectedSteeringAxle}
                                        onChange={loadTableData}>
                                    <option value=''>Все</option>
                                    {filterData['steering_axles'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className='table-wrapper'>
                        <div className='table-window'>
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
                            {tableData.map((item, index) => (
                                <tr key={index} onClick={() =>
                                        openCard('machines', item['id'])}>
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
                        </div>
                    </div>
                </>
            ) : (
                <div className='loading'>Загрузка...</div>
                )
            }
        </div>
    )
}


const MainPage = ({clientName, clientRole}) => {
    const [currentTab, setCurrentTab] = useState('machines');
    const machinesTab = useRef(null);
    const maintenanceTab = useRef(null);
    const complaintsTab = useRef(null);

    const setMachines = () => {
        machinesTab.current?.classList.add('active');
        maintenanceTab.current?.classList.remove('active');
        complaintsTab.current?.classList.remove('active');
        setCurrentTab('machines')
    }

    const setMaintenance = () => {
        machinesTab.current?.classList.remove('active');
        maintenanceTab.current?.classList.add('active');
        complaintsTab.current?.classList.remove('active');
        setCurrentTab('maintenance')
    }

    const setComplaints = () => {
        machinesTab.current?.classList.remove('active');
        maintenanceTab.current?.classList.remove('active');
        complaintsTab.current?.classList.add('active');
        setCurrentTab('complaints')
    }
    useEffect(() => {
        setMachines();
    }, [clientName]);
    return (
        <div className='main-page-content'>
            {clientName ? (<p className={'client-info'}>{clientName}</p>) : null}
            {currentTab === 'machines' &&
                <p className='table-entry'>
                    Информация о комплектации и технических характеристиках Вашей техники
                </p>
            }
            {currentTab === 'maintenance' &&
                <p className='table-entry'>
                    Информация о проведенных ТО Вашей техники
                </p>
            }
            {currentTab === 'complaints' &&
                <p className='table-entry'>
                    Информация о рекламациях по Вашей техники
                </p>
            }
            <div>
                {clientRole ? (
                    <div className='table-tabs'>
                        <div className='table-tab' ref={machinesTab}
                             onClick={setMachines}>
                            Общая информация
                        </div>
                        <div className='table-tab' ref={maintenanceTab}
                             onClick={setMaintenance}>
                            ТО
                        </div>
                        <div className='table-tab' ref={complaintsTab}
                             onClick={setComplaints}>
                            Рекламации
                        </div>
                    </div>
                ) : (
                    <div className='table-tabs'>
                        <div className='table-tab' ref={machinesTab}
                             onClick={setMachines}>
                            Общая информация
                        </div>
                    </div>
                )}
            </div>
            {currentTab === 'machines' && <MachinesTab/>}
            {currentTab === 'maintenance' && <MaintenanceTab/>}
            {currentTab === 'complaints' && <ComplaintsTab/>}
            <AddNewBtn currentTab={currentTab} clientRole={clientRole}/>
        </div>
    )
}


export {MainPage}