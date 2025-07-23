import {API_URL} from "../App.jsx";


export const maintenanceChangeData = async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(
        `${API_URL}/maintenance_change`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });
    const data = await response.json();
    return data;
}


export const complaintChangeData = async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(
        `${API_URL}/complaint_change`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });
    return await response.json();
}


export const machineChangeData = async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(
        `${API_URL}/machine_change`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });
    const data = await response.json();
    return data;
}


export const postCardChangesMachine = async (queryParams) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(
        `${API_URL}/machine_change`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(queryParams),
        });
    return await response.json();
}


export const postCardChangesMaintenance = async (queryParams) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(
        `${API_URL}/maintenance_change`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(queryParams),
        });
    return await response.json();
}


export const postCardChangesComplaint = async (queryParams) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(
        `${API_URL}/complaint_change`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(queryParams),
        });
    return await response.json();
}


export const postNewMachine = async (queryParams) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(
        `${API_URL}/machine_new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(queryParams),
        });
    return await response.json();
}


export const postNewMaintenance = async (queryParams) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(
        `${API_URL}/maintenance_new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(queryParams),
        });
    return await response.json();
}


export const postNewComplaint = async (queryParams) => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(
        `${API_URL}/complaint_new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(queryParams),
        });
    return await response.json();
}
