import {useEffect, useState} from "react";
import '../assets/css/cardPage.css';
import {
    machineChangeData,
    maintenanceChangeData,
    complaintChangeData,
    postNewMachine,
    postNewMaintenance,
    postNewComplaint
} from "./utils.jsx";


const NewMachineForm = ({setCurrentPage}) => {
    const [creationData, setCreationData] = useState({
        clients: [],
        service_companies: []
    });
    const [cardData, setCardData] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(null);

    const handleSubmit = async (form) => {
        form.preventDefault();
        const response = await postNewMachine(cardData);
        response['response'] === 'success' ? (
            setSaveSuccess('success')
        ) : (
            setSaveSuccess('error')
        )
        setTimeout(() => setSaveSuccess(null), 3000);
        if (response['response'] === 'success') {setCurrentPage('main')}
    };

    const handleChange = (e) => {
        setCardData({...cardData, [e.target.name]: e.target.value});
    };

    const loadCard = async () => {
        setCreationData(await machineChangeData());
    }

    useEffect(() => {
        loadCard();
    }, [])
    return (
        <div className="card-data">
            <p>Новая машина</p>
            {saveSuccess === 'success' ? (
                <div className='save-success save-msg'>Создание успешно</div>
            ) : (saveSuccess === 'error' ? (
                    <div className='save-error save-msg'>Ошибка при создании</div>) : null
            )}
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
                        <input name='machine_model'
                                value={cardData['machine_model']}
                                onChange={handleChange}/>
                    </div>
                    <div className='data-block'>
                        <label>Модель двигателя: </label>
                        <input name='engine'
                                value={cardData['engine']}
                                onChange={handleChange}/>
                    </div>
                    <div className='data-block'>
                        <label>Зав. № двигателя: </label>
                        <input value={cardData['engine_factory_number']}
                               name='engine_factory_number'
                               onChange={handleChange}/>
                    </div>
                    <div className='data-block'>
                        <label>Модель трансмиссии: </label>
                        <input name='transmission'
                                value={cardData['transmission']}
                                onChange={handleChange}/>
                    </div>
                    <div className='data-block'>
                        <label>Зав. № трансмиссии: </label>
                        <input value={cardData['transmission_factory_number']}
                               name='transmission_factory_number'
                               onChange={handleChange}/>
                    </div>
                    <div className='data-block'>
                        <label>Модель ведущего моста: </label>
                        <input name='drive_axle'
                                value={cardData['drive_axle']}
                                onChange={handleChange}/>
                    </div>
                    <div className='data-block'>
                        <label>Зав. № ведущего моста: </label>
                        <input value={cardData['drive_axle_factory_number']}
                               name='drive_axle_factory_number'
                               onChange={handleChange}/>
                    </div>
                    <div className='data-block'>
                        <label>Модель управляющего моста: </label>
                        <input name='steering_axle'
                                value={cardData['steering_axle']}
                                onChange={handleChange}/>
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
                            <option value=''>-Клиент-</option>
                            {creationData.clients.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='data-block'>
                        <label>Сервисная компания: </label>
                        <select name='service_company'
                                value={cardData['service_company']}
                                onChange={handleChange}>
                            <option value=''>-Сервисная компания-</option>
                            {creationData.service_companies.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type='submit' className='submit-changes-btn'>Создать</button>
            </form>
        </div>
    )
}


const NewMaintenanceForm = ({setCurrentPage}) => {
    const [creationData, setCreationData] = useState({
        machines: [],
        maintenance_types: [],
    });
    const [cardData, setCardData] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(null);

    const handleSubmit = async (form) => {
        form.preventDefault();
        const response = await postNewMaintenance(cardData);
        response['response'] === 'success' ? (
            setSaveSuccess('success')
        ) : (
            setSaveSuccess('error')
        )
        setTimeout(() => setSaveSuccess(null), 3000);
        if (response['response'] === 'success') {setCurrentPage('main')}
    };

    const handleChange = (e) => {
        setCardData({...cardData, [e.target.name]: e.target.value});
    };

    const loadCard = async () => {
        setCreationData(await maintenanceChangeData());
    }

    useEffect(() => {
        loadCard();
    }, [])
    return (
        <div className="card-data">
            <p>Новое ТО</p>
            {saveSuccess === 'success' ? (
                <div className='save-success save-msg'>Создание успешно</div>
            ) : (saveSuccess === 'error' ? (
                    <div className='save-error save-msg'>Ошибка при создании</div>) : null
            )}
            <form className='edit-card-form'
                  onSubmit={handleSubmit}>
                <div className='data-wrapper'>
                    <div className='data-block'>
                        <label>Зав. № машины:</label>
                        <select name='machine_factory_number'
                                value={cardData['machine_factory_number']}
                                onChange={handleChange}>
                            <option value=''>-Машина-</option>
                            {creationData['machines'].map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className='data-block'>
                        <label>Тип ТО:</label>
                        <select name='maintenance_type'
                                value={cardData['maintenance_type']}
                                onChange={handleChange}>
                            <option value=''>-Тип ТО-</option>
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
                <button type='submit' className='submit-changes-btn'>Создать</button>
            </form>
        </div>
    )
}


const NewComplaintForm = ({setCurrentPage}) => {
    const [cardData, setCardData] = useState('');
    const [creationData, setCreationData] = useState({
        machines: [],
        failure_nodes: [],
        recovery_methods: []
    });
    const [saveSuccess, setSaveSuccess] = useState(null);

    const handleSubmit = async (form) => {
        form.preventDefault();
        const response = await postNewComplaint(cardData);
        response['response'] === 'success' ? (
            setSaveSuccess('success')
        ) : (
            setSaveSuccess('error')
        )
        setTimeout(() => setSaveSuccess(null), 3000);
        if (response['response'] === 'success') {setCurrentPage('main')}

    };

    const handleChange = (e) => {
        setCardData({...cardData, [e.target.name]: e.target.value});
    };

    const loadCard = async () => {
        setCreationData(await complaintChangeData());
    }

    useEffect(() => {
        loadCard()
    }, [])
    return (
        <div className="card-data">
            <p>Новая рекламация</p>
            {saveSuccess === 'success' ? (
                <div className='save-success save-msg'>Создание успешно</div>
            ) : (saveSuccess === 'error' ? (
                    <div className='save-error save-msg'>Ошибка при создании</div>) : null
            )}
            <form className="edit-card-form"
                  onSubmit={handleSubmit}>
                <div className='data-wrapper'>
                    <div className='data-block'>
                        <label>Зав. № машины: </label>
                        <select name='machine_factory_number'
                                value={cardData['machine_factory_number']}
                                onChange={handleChange}>
                            <option value=''>-Машина-</option>
                            {creationData['machines'].map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
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
                            <option value=''>-Узел-</option>
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
                            <option value=''>-Метод восстановления-</option>
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
                <button type='submit' className='submit-changes-btn'>Создать</button>
            </form>
        </div>
    )
}


const NewObjectCard = ({setCurrentPage}) => {
    const [cardType, setCardType] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const type = queryParams.get('type');

        if (type) {
            setCardType(type);
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
            </div>

            {cardType === 'machines' && <NewMachineForm cardType={cardType}
                                                       setCurrentPage={setCurrentPage} />}
            {cardType === 'maintenance' && <NewMaintenanceForm cardType={cardType}
                                                               setCurrentPage={setCurrentPage} />}
            {cardType === 'complaints' && <NewComplaintForm cardType={cardType}
                                                           setCurrentPage={setCurrentPage}/>}
        </div>
    )
}


export {NewObjectCard}
