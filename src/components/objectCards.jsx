import {useEffect, useState} from "react";
import '../assets/css/cardPage.css';
import {API_URL} from "../App.jsx";
import {
    complaintChangeData,
    machineChangeData,
    maintenanceChangeData,
    postCardChangesComplaint,
    postCardChangesMachine,
    postCardChangesMaintenance,
} from "./utils.jsx";


const MachineCard = ({cardType, editMode, setEditMode}) => {
    const [creationData, setChangeData] = useState('');
    const [cardData, setCardData] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(null);
    const token = localStorage.getItem('authToken');

    const handleSubmit = async (form) => {
        form.preventDefault();
        const response = await postCardChangesMachine(cardData);
        response['response'] === 'success' ? (
            setSaveSuccess('success')
        ) : (
            setSaveSuccess('error')
        )
        setEditMode(false)
        setTimeout(() => setSaveSuccess(null), 3000);
    };

    const handleChange = (e) => {
        setCardData({...cardData, [e.target.name]: e.target.value});
    };

    const loadCard = async () => {
        const response = await fetch(
            `${API_URL}/machine_card?machineId=${cardType[1]}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        const data = await response.json();
        setCardData(data);
        setChangeData(await machineChangeData());
    }

    useEffect(() => {
        loadCard();
    }, [editMode])
    return (
        <div className="card-data">
            <p>Данные машины</p>
            {saveSuccess === 'success' ? (
                <div className='save-success save-msg'>Изменения внесены успешно</div>
            ) : (saveSuccess === 'error' ? (
                    <div className='save-error save-msg'>Ошибка при внесении изменений</div>) : null
            )}
            {editMode ? (
                <form className='edit-card-form'
                      onSubmit={handleSubmit}>
                    <div className='data-wrapper'>
                        <div className='data-block'>
                            <label>Зав. № машины: </label>
                            <input value={cardData['machine_factory_number']}
                                   name='machine_factory_number'
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <label>Модель: </label>
                            <select name='machine_model'
                                    value={cardData['machine_model']}
                                    onChange={handleChange}>
                                {creationData['machine_models'].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className='data-block'>
                            <label>Модель двигателя: </label>
                            <select name='engine'
                                    value={cardData['engine']}
                                    onChange={handleChange}>
                                {creationData['engine_models'].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className='data-block'>
                            <label>Зав. № двигателя: </label>
                            <input value={cardData['engine_factory_number']}
                                   name='engine_factory_number'
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <label>Модель трансмиссии: </label>
                            <select name='transmission'
                                    value={cardData['transmission']}
                                    onChange={handleChange}>
                                {creationData['transmission_models'].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className='data-block'>
                            <label>Зав. № трансмиссии: </label>
                            <input value={cardData['transmission_factory_number']}
                                   name='transmission_factory_number'
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <label>Модель ведущего моста: </label>
                            <select name='drive_axle'
                                    value={cardData['drive_axle']}
                                    onChange={handleChange}>
                                {creationData['drive_axle_models'].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className='data-block'>
                            <label>Зав. № ведущего моста: </label>
                            <input value={cardData['drive_axle_factory_number']}
                                   name='drive_axle_factory_number'
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <label>Модель управляющего моста: </label>
                            <select name='steering_axle'
                                    value={cardData['steering_axle']}
                                    onChange={handleChange}>
                                {creationData['steering_axle_models'].map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className='data-block'>
                            <label>Зав. № управляющего моста: </label>
                            <input value={cardData['steering_axle_factory_number']}
                                   name='steering_axle_factory_number'
                                   onChange={handleChange}/>
                        </div>
                        <div className='contract-block'>
                            <div>
                                <span>Договор № </span>
                                <input value={cardData['contract_number']}
                                       name='contract_number'
                                       onChange={handleChange}/>
                            </div>
                            <div>
                                <span>от </span>
                                <input type='date' value={cardData['contract_date']}
                                       name='contract_date'
                                       onChange={handleChange}/>
                            </div>
                        </div>
                        <div className='data-block'>
                            <label>Грузополучатель: </label>
                            <input value={cardData['consignee']}
                                   name='consignee'
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <label>Адрес доставки: </label>
                            <input value={cardData['delivery_address']}
                                   name='delivery_address'
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <label>Комплектация: </label>
                            <input value={cardData['equipment']}
                                   name='equipment'
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <label>Клиент: </label>
                            <select name='client'
                                    value={cardData['client']}
                                    onChange={handleChange}>
                                {creationData['clients'].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className='data-block'>
                            <label>Сервисная компания: </label>
                            <select name='service_company'
                                    value={cardData['service_company']}
                                    onChange={handleChange}>
                                {creationData['service_companies'].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type='submit' className='submit-changes-btn'>
                        Сохранить изменения
                    </button>
                </form>
            ) : (
                <div className='data-wrapper'>
                    <div className='data-block'>
                        <span>Зав. № машины: </span>
                        <span>{cardData['machine_factory_number']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Модель: </span>
                        <span>{cardData['machine_model']}</span>
                    </div>
                    {/*<div className='data-block'>*/}
                    {/*    <span>Описание модели: </span>*/}
                    {/*    <span>{cardData['machine_model_description']}</span>*/}
                    {/*</div>*/}
                    <div className='data-block'>
                        <span>Модель двигателя: </span>
                        <span>{cardData['engine']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Зав. № двигателя: </span>
                        <span>{cardData['engine_factory_number']}</span>
                    </div>
                    {/*<div className='data-block'>*/}
                    {/*    <span>Описание модели двигателя: </span>*/}
                    {/*    <span>{cardData['engine_description']}</span>*/}
                    {/*</div>*/}
                    <div className='data-block'>
                        <span>Модель трансмиссии: </span>
                        <span>{cardData['transmission']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Зав. № трансмиссии: </span>
                        <span>{cardData['transmission_factory_number']}</span>
                    </div>
                    {/*<div className='data-block'>*/}
                    {/*    <span>Описание модели трансмиссии: </span>*/}
                    {/*    <span>{cardData['transmission_description']}</span>*/}
                    {/*</div>*/}
                    <div className='data-block'>
                        <span>Модель ведущего моста: </span>
                        <span>{cardData['drive_axle']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Зав. № ведущего моста: </span>
                        <span>{cardData['drive_axle_factory_number']}</span>
                    </div>
                    {/*<div className='data-block'>*/}
                    {/*    <span>Описание модели ведущего моста: </span>*/}
                    {/*    <span>{cardData['drive_axle_description']}</span>*/}
                    {/*</div>*/}
                    <div className='data-block'>
                        <span>Модель управляющего моста: </span>
                        <span>{cardData['steering_axle']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Зав. № управляющего моста: </span>
                        <span>{cardData['steering_axle_factory_number']}</span>
                    </div>
                    {/*<div className='data-block'>*/}
                    {/*    <span>Описание модели управляющего моста: </span>*/}
                    {/*    <span>{cardData['steering_axle_description']}</span>*/}
                    {/*</div>*/}
                    <div className='data-block'>
                        <span>Договор №{cardData['contract_number']} от {cardData['contract_date'] &&
                            cardData['contract_date'].split('-').reverse().join('.')}</span>
                    </div>
                    <div className='data-block'>
                        <span>Грузополучатель: </span>
                        <span>{cardData['consignee']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Адрес доставки: </span>
                        <span>{cardData['delivery_address']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Комплектация: </span>
                        <span>{cardData['equipment']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Клиент: </span>
                        <span>{cardData['client']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Сервисная компания: </span>
                        <span>{cardData['service_company']}</span>
                    </div>
                    {/*<div className='data-block'>*/}
                    {/*    <span>Описание сервисной компании: </span>*/}
                    {/*    <span>{cardData['service_company_description']}</span>*/}
                    {/*</div>*/}
                </div>
            )}
        </div>
    )
}


const MaintenanceCard = ({cardType, editMode, setEditMode}) => {
    const [creationData, setChangeData] = useState('');
    const [cardData, setCardData] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(null);
    const token = localStorage.getItem('authToken');

    const handleSubmit = async (form) => {
        form.preventDefault();
        const response = await postCardChangesMaintenance(cardData);
        response['response'] === 'success' ? (
            setSaveSuccess('success')
        ) : (
            setSaveSuccess('error')
        )
        setEditMode(false)
        setTimeout(() => setSaveSuccess(null), 3000);
    };

    const handleChange = (e) => {
        setCardData({...cardData, [e.target.name]: e.target.value});
    };

    const loadCard = async () => {
        const response = await fetch(
            `${API_URL}/maintenance_card?maintenance_id=${cardType[1]}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        const data = await response.json();
        setCardData(data);
        setChangeData(await maintenanceChangeData());
    }

    useEffect(() => {
        loadCard();
    }, [editMode])
    return (
        <div className="card-data">
            <p>Данные ТО</p>
            {saveSuccess === 'success' ? (
                <div className='save-success save-msg'>Изменения внесены успешно</div>
            ) : (saveSuccess === 'error' ? (
                    <div className='save-error save-msg'>Ошибка при внесении изменений</div>) : null
            )}
            {editMode ? (
                <form className='edit-card-form'
                      onSubmit={handleSubmit}>
                    <div className='data-wrapper'>
                        <div className='data-block'>
                            <label>Зав. № машины:</label>
                            <input disabled
                                   value={cardData['machine_factory_number']}
                                   name='machine_factory_number'
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <label>Тип ТО:</label>
                            <select name='maintenance_type'
                                    value={cardData['maintenance_type']}
                                    onChange={handleChange}>
                                {creationData['maintenance_types'].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className='data-block'>
                            <label>Дата проведения ТО:</label>
                            <input type='date' value={cardData['maintenance_date']}
                                   name='maintenance_date'
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <label>Наработка, м/час:</label>
                            <input value={cardData['operating_time']}
                                   name='operating_time'
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <label>№ заказ-наряда:</label>
                            <input value={cardData['work_order_number']}
                                   name='work_order_number'
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <label>Дата заказ-наряда:</label>
                            <input type='date' value={cardData['work_order_date']}
                                   name='work_order_date'
                                   onChange={handleChange}/>
                        </div>
                    </div>
                    <button type='submit' className='submit-changes-btn'>
                        Сохранить изменения</button>
                </form>
            ) : (
                <div className='data-wrapper'>
                    <div className='data-block'>
                        <span>Зав. № машины: </span>
                        <span>{cardData['machine_factory_number']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Тип ТО: </span>
                        <span>{cardData['maintenance_type']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Описание ТО: </span>
                        <span>{cardData['maintenance_type_description']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Дата проведения ТО: </span>
                        <span>{cardData['maintenance_date'] &&
                            cardData['maintenance_date'].split('-').reverse().join('.')}</span>
                    </div>
                    <div className='data-block'>
                        <span>Наработка, м/час: </span>
                        <span>{cardData['operating_time']}</span>
                    </div>
                    <div className='data-block'>
                        <span>№ заказ-наряда: </span>
                        <span>{cardData['work_order_number']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Дата заказ-наряда: </span>
                        <span>{cardData['work_order_date'] &&
                            cardData['work_order_date'].split('-').reverse().join('.')}</span>
                    </div>
                    <div className='data-block'>
                        <span>Сервисная компания: </span>
                        <span>{cardData['service_company']}</span>
                    </div>
                </div>
            )}
        </div>
    )
}


const ComplaintCard = ({cardType, editMode, setEditMode}) => {
    const [cardData, setCardData] = useState('');
    const [creationData, setChangeData] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(null);
    const token = localStorage.getItem('authToken');

    const handleSubmit = async (form) => {
        form.preventDefault();
        const response = await postCardChangesComplaint(cardData);
        response['response'] === 'success' ? (
            setSaveSuccess('success')
        ) : (
            setSaveSuccess('error')
        )
        setEditMode(false)
        setTimeout(() => setSaveSuccess(null), 3000);
    };

    const handleChange = (e) => {
        setCardData({...cardData, [e.target.name]: e.target.value});
    };

    const loadCard = async () => {
        const response = await fetch(
            `${API_URL}/complaint_card?complaint_id=${cardType[1]}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
        const data = await response.json();
        setCardData(data);
        setChangeData(await complaintChangeData())
    }

    useEffect(() => {
        loadCard()
    }, [editMode])
    return (
        <div className="card-data">
            <p>Данные рекламации</p>
            {saveSuccess === 'success' ? (
                <div className='save-success save-msg'>Изменения внесены успешно</div>
            ) : (saveSuccess === 'error' ? (
                <div className='save-error save-msg'>Ошибка при внесении изменений</div>) : null
            )}
            {editMode ? (
                <form className="edit-card-form"
                      onSubmit={handleSubmit}>
                    <div className='data-wrapper'>
                        <div className='data-block'>
                            <label>Зав. № машины: </label>
                            <input disabled
                                   name='machine_factory_number'
                                   value={cardData['machine_factory_number']}
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <span>Наработка, м/час: </span>
                            <input name='operating_time'
                                   value={cardData['operating_time']}
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <span>Дата восстановления: </span>
                            <input type='date' name='recovery_date'
                                   value={cardData['recovery_date']}
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <span>Дата отказа: </span>
                            <input type='date' name='failure_date'
                                   value={cardData['failure_date']}
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <span>Дней простоя: </span>
                            <input name='downtime'
                                   value={cardData['downtime']}
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <span>Узел отказа: </span>
                            <select name='failure_node'
                                    value={cardData['failure_node']}
                                    onChange={handleChange}>
                                {creationData['failure_nodes'].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className='data-block'>
                            <span>Описание отказа: </span>
                            <input name='failure_description'
                                   value={cardData['failure_description']}
                                   onChange={handleChange}/>
                        </div>
                        <div className='data-block'>
                            <span>Метод восстановления: </span>
                            <select name='recovery_method'
                                    value={cardData['recovery_method']}
                                    onChange={handleChange}>
                                {creationData['recovery_methods'].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className='data-block'>
                            <span>Использованные запчасти: </span>
                            <input name='spare_parts'
                                   value={cardData['spare_parts']}
                                   onChange={handleChange}/>
                        </div>
                    </div>
                    <button type='submit' className='submit-changes-btn'>
                        Сохранить изменения
                    </button>
                </form>
            ) : (
                <div className='data-wrapper'>
                    <div className='data-block'>
                        <span>Зав. № машины: </span>
                        <span>{cardData['machine_factory_number']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Наработка м/час: </span>
                        <span>{cardData['operating_time']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Дата восстановления: </span>
                        <span>{cardData['recovery_date'] &&
                            cardData['recovery_date'].split('-').reverse().join('.')}</span>
                    </div>
                    <div className='data-block'>
                        <span>Дата отказа: </span>
                        <span>{cardData['failure_date'] &&
                            cardData['failure_date'].split('-').reverse().join('.')}</span>
                    </div>
                    <div className='data-block'>
                        <span>Дней простоя: </span>
                        <span>{cardData['downtime']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Узел отказа: </span>
                        <span>{cardData['failure_node']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Описание отказа: </span>
                        <span>{cardData['failure_description']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Метод восстановления: </span>
                        <span>{cardData['recovery_method']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Использованные запчасти: </span>
                        <span>{cardData['spare_parts']}</span>
                    </div>
                    <div className='data-block'>
                        <span>Сервисная компания: </span>
                        <span>{cardData['service_company']}</span>
                    </div>
                </div>
            )}
        </div>
    )
}


const Card = ({clientRole, setCurrentPage}) => {
    const [editMode, setEditMode] = useState(false);
    const [cardType, setCardType] = useState([]);

    let requiredRolesToEdit = [];
    if (cardType[0] === 'machine') {
        requiredRolesToEdit = ['manager'];
    } else if (cardType[0] === 'maintenance') {
        requiredRolesToEdit = ['client', 'service', 'manager'];
    } else if (cardType[0] === 'complaint') {
        requiredRolesToEdit = ['service', 'manager'];
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const type = queryParams.get('type');
        const id = Number(queryParams.get('id'));

        if (type && id) {
            setCardType([type, id]);
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }

    }, []);
    return (
        <div className='card-content'>
            <div className="card-header">
                <button className='back-to-main'
                        onClick={() => setCurrentPage('main')}>&lt;&lt; На главную
                </button>
                {requiredRolesToEdit.includes(clientRole)
                    && <button onClick={() => setEditMode(!editMode)}
                               className={editMode ? ('edit-on') : ('edit-off')}>Редактирование</button>}
            </div>

            {cardType[0] === 'machine'
                && <MachineCard cardType={cardType} editMode={editMode} setEditMode={setEditMode}/>}
            {cardType[0] === 'maintenance'
                && <MaintenanceCard cardType={cardType} editMode={editMode} setEditMode={setEditMode}/>}
            {cardType[0] === 'complaint'
                && <ComplaintCard cardType={cardType} editMode={editMode} setEditMode={setEditMode}/>}
        </div>
    )
}


export {Card}
