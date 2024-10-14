import requests
import random
from datetime import datetime, timedelta
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

API_URL_LOGIN = "https://localhost:7023/Account/Login"
API_URL_FIND_PATIENT = "https://localhost:7023/User/FindPatient"
API_URL_CREATE_APPOINTMENT = "https://localhost:7023/Appointments/Appointment/Create"

def login_physio(api_url, index):
    email = f"physio{index}@example.com"
    password = "Password12#"
    login_data = {
        "email": email,
        "password": password
    }
    
    try:
        response = requests.post(api_url, json=login_data, verify=False)

        if response.status_code == 200:
            token = response.json().get("data")
            print(f"Physiotherapist {email} logged in successfully! Token: {token}")
            return token
        else:
            print(f"Physiotherapist {email} login failed. Status: {response.status_code}")
            print("Response:", response.text)
            return None
    except requests.RequestException as e:
        print(f"Error during login: {e}")
        return None

def find_patient(api_url, token, patient_email):
    headers = {"Authorization": f"Bearer {token}"}
    search_param = {
        "searchParam": patient_email
    }
    
    try:
        response = requests.post(api_url, json=search_param, headers=headers, verify=False)

        if response.status_code == 200:
            patient_data = response.json().get("data")
            print(f"Patient found: {patient_data}")
            return patient_data
        else:
            print(f"Failed to find patient. Status: {response.status_code}")
            print("Response:", response.text)
            return None
    except requests.RequestException as e:
        print(f"Error during patient search: {e}")
        return None

def create_appointment(api_url, token, patient_id):
    headers = {"Authorization": f"Bearer {token}"}
    
    appointment_date = datetime(2023, random.randint(1, 12), random.randint(1, 28)).isoformat() + 'Z'
    
    appointment_data = {
        "patientId": patient_id,
        "appointmentDate": appointment_date,
        "appointmentDescription": "Routine checkup",
        "notes": "Follow-up on previous treatment",
        "diagnosis": "Regular checkup",
        "isPaid": True,
        "price": 0
    }
    
    try:
        response = requests.post(api_url, json=appointment_data, headers=headers, verify=False)

        if response.status_code == 201:
            print(f"Appointment created successfully! Appointment Date: {appointment_date}")
        else:
            print(f"Failed to create appointment. Status: {response.status_code}")
            print("Response:", response.text)
    except requests.RequestException as e:
        print(f"Error during appointment creation: {e}")

physiotherapist_ids = [f"physio{index}@example.com" for index in range(1, 11)]
for index in range(1, 11):
    token = login_physio(API_URL_LOGIN, index)
    
    if token:
        patient_email = f"patient{index}@example.com"
        patient_data = find_patient(API_URL_FIND_PATIENT, token, patient_email)
        
        if patient_data:
            patient_id = patient_data['id']
            for physiotherapist_index in range(1, 11):
                physiotherapist_email = f"physio{physiotherapist_index}@example.com"
                create_appointment(API_URL_CREATE_APPOINTMENT, token, patient_id)
