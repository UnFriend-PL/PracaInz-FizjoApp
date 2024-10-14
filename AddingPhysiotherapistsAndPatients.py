import requests
import random
from datetime import datetime, timedelta
import urllib3

# Wyłączenie ostrzeżeń o certyfikacie SSL
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

API_URL_REGISTER_PATIENT = "https://localhost:7023/Account/RegisterPatient"
API_URL_LOGIN = "https://localhost:7023/Account/Login"
API_URL_REGISTER_PHYSIO = "https://localhost:7023/Account/RegisterPhysiotherapist"



genders = ["male", "female"]
countries = ["Poland", "Germany", "France", "Spain", "Italy"]
cities = ["Warsaw", "Berlin", "Paris", "Madrid", "Rome"]
streets = ["Main St 123", "Oak Ave 456", "Pine St 789", "Maple Rd 101", "Birch Ln 202"]
post_codes = ["00-001", "10115", "75001", "28013", "00100"]
first_names = ["John", "Jane", "Alex", "Emily", "Michael", "Sarah", "David", "Anna", "Robert", "Laura"]
last_names = ["Smith", "Johnson", "Brown", "Williams", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Wilson"]



def generate_random_patient(index):
    gender = random.choice(genders)
    date_of_birth = datetime.now() - timedelta(days=random.randint(6570, 18250))
    pesel = generate_pesel(date_of_birth, gender)

    return {
        "insuranceNumber": f"INS{random.randint(100000, 999999)}",
        "firstName": random.choice(first_names),
        "lastName": random.choice(last_names),
        "gender": gender,
        "country": random.choice(countries),
        "city": random.choice(cities),
        "streetWithHouseNumber": random.choice(streets),
        "postCode": random.choice(post_codes),
        "pesel": pesel,
        "dateOfBirth": date_of_birth.isoformat(),
        "email": f"patient{index}@example.com",
        "password": "Password12#",
        "confirmPassword": "Password12#",
        "phoneNumber": f"{random.randint(100000000, 999999999)}"
    }

def add_patient(api_url, patient_data):
    """Wysyłanie zapytania POST do API"""
    try:
        response = requests.post(api_url, json=patient_data, verify=False)

        if response.status_code == 200:
            print(f"Pacjent {patient_data['firstName']} {patient_data['lastName']} został dodany pomyślnie!")
            return patient_data['email'], patient_data['password']
        else:
            print(f"Nie udało się dodać pacjenta {patient_data['firstName']} {patient_data['lastName']}. Status: {response.status_code}")
            print("Odpowiedź:", response.text)
            return None, None

    except requests.RequestException as e:
        print(f"Błąd podczas wysyłania zapytania: {e}")
        return None, None

def generate_pesel(date_of_birth, gender):
    """Generowanie numeru PESEL na podstawie daty urodzenia i płci"""
    year = date_of_birth.year
    month = date_of_birth.month
    day = date_of_birth.day

    if 1900 <= year <= 1999:
        month_code = month
    elif 2000 <= year <= 2099:
        month_code = month + 20
    elif 1800 <= year <= 1899:
        month_code = month + 80
    else:
        raise ValueError("Nieprawidłowy rok dla generowania PESEL")

    pesel = f"{year % 100:02d}{month_code:02d}{day:02d}"

    random_number = random.randint(0, 999)
    gender_digit = random.randint(0, 9)
    if gender == "male":
        gender_digit |= 1  # Ustaw ostatni bit na 1 (cyfra nieparzysta)
    else:
        gender_digit &= ~1  # Ustaw ostatni bit na 0 (cyfra parzysta)

    pesel += f"{random_number:03d}{gender_digit}"

    weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
    checksum = sum(int(pesel[i]) * weights[i] for i in range(10)) % 10
    checksum = (10 - checksum) % 10

    pesel += str(checksum)
    return pesel

def login_patient(api_url, email, password):
    """Wysyłanie zapytania logowania do API"""
    login_data = {
        "email": email,
        "password": password
    }
    try:
        response = requests.post(api_url, json=login_data, verify=False)

        if response.status_code == 200:
            token = response.json().get("data")
            print(f"Pacjent {email} zalogował się pomyślnie! Token: {token}")
            return token
        else:
            print(f"Logowanie pacjenta {email} nie powiodło się. Status: {response.status_code}")
            print("Odpowiedź:", response.text)
            return None
    except requests.RequestException as e:
        print(f"Błąd podczas logowania: {e}")
        return None

def generate_random_physio(index):
    gender = random.choice(genders)
    date_of_birth = datetime.now() - timedelta(days=random.randint(6570, 18250))

    return {
        "licenseNumber": f"LIC{random.randint(1000, 9999)}",
        "firstName": random.choice(first_names),
        "lastName": random.choice(last_names),
        "gender": gender,
        "country": random.choice(countries),
        "city": random.choice(cities),
        "streetWithHouseNumber": random.choice(streets),
        "postCode": random.choice(post_codes),
        "pesel": generate_pesel(date_of_birth, gender),
        "dateOfBirth": date_of_birth.isoformat(),
        "email": f"physio{index}@example.com",
        "password": "Password12#",
        "confirmPassword": "Password12#",
        "phoneNumber": f"{random.randint(100000000, 999999999)}"
    }

def add_physio(api_url, physio_data):
    try:
        response = requests.post(api_url, json=physio_data, verify=False)

        if response.status_code == 200:
            print(f"Fizjoterapeuta {physio_data['firstName']} {physio_data['lastName']} został dodany pomyślnie!")
            return physio_data['email'], physio_data['password']
        else:
            print(f"Nie udało się dodać fizjoterapeuty {physio_data['firstName']} {physio_data['lastName']}. Status: {response.status_code}")
            print("Odpowiedź:", response.text)
            return None, None

    except requests.RequestException as e:
        print(f"Błąd podczas wysyłania zapytania: {e}")
        return None, None

def login_physio(api_url, email, password):
    login_data = {
        "email": email,
        "password": password
    }
    try:
        response = requests.post(api_url, json=login_data, verify=False)

        if response.status_code == 200:
            token = response.json().get("data")
            print(f"Fizjoterapeuta {email} zalogował się pomyślnie! Token: {token}")
            return token
        else:
            print(f"Logowanie fizjoterapeuty {email} nie powiodło się. Status: {response.status_code}")
            print("Odpowiedź:", response.text)
            return None
    except requests.RequestException as e:
        print(f"Błąd podczas logowania: {e}")
        return None

def search_patient(api_url, token, email):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    search_param = {"searchParam": email}

    try:
        response = requests.post(api_url, json=search_param, headers=headers, verify=False)

        if response.status_code == 200:
            patient_id = response.json()["data"]["id"]
            print(f"Znaleziono pacjenta: {email}, ID: {patient_id}")
            return patient_id
        else:
            print(f"Nie udało się znaleźć pacjenta {email}. Status: {response.status_code}")
            print("Odpowiedź:", response.text)
            return None
    except requests.RequestException as e:
        print(f"Błąd podczas wyszukiwania pacjenta: {e}")
        return None

def schedule_appointment(api_url, token, patient_id, physio_id):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    appointment_date = datetime.now() - timedelta(days=random.randint(1, 30))
    appointment_data = {
        "patientId": patient_id,
        "physiotherapistId": physio_id,
        "appointmentDate": appointment_date.isoformat() + "Z",
        "appointmentDescription": "Regular Checkup",
        "notes": "No specific notes.",
        "diagnosis": "Healthy",
        "isPaid": True,
        "price": 0
    }

    try:
        response = requests.post(api_url, json=appointment_data, headers=headers, verify=False)

        if response.status_code == 200:
            print(f"Wizyta dla pacjenta ID: {patient_id} z fizjoterapeutą ID: {physio_id} została zaplanowana pomyślnie!")
        else:
            print(f"Nie udało się zaplanować wizyty. Status: {response.status_code}")
            print("Odpowiedź:", response.text)

    except requests.RequestException as e:
        print(f"Błąd podczas dodawania wizyty: {e}")

def add_multiple_patients(api_url_register, api_url_login, number_of_patients):
    tokens = []
    for i in range(1, number_of_patients + 1):
        patient = generate_random_patient(i)
        email, password = add_patient(api_url_register, patient)
        if email and password:
            token = login_patient(api_url_login, email, password)
            if token:
                tokens.append((email, password, token))
    return tokens

def add_multiple_physios(api_url_register, api_url_login, number_of_physios):
    tokens = []
    for i in range(1, number_of_physios + 1):
        physio = generate_random_physio(i)
        email, password = add_physio(api_url_register, physio)
        if email and password:
            token = login_physio(api_url_login, email, password)
            if token:
                tokens.append((email, token))
    return tokens

patient_tokens = add_multiple_patients(API_URL_REGISTER_PATIENT, API_URL_LOGIN, 10)
physio_tokens = add_multiple_physios(API_URL_REGISTER_PHYSIO, API_URL_LOGIN, 10)



def fizjoAdminAdd(firstname, lastname, gender):
    fizjo = {
        "licenseNumber": f"LIC{random.randint(1000, 9999)}",
        "firstName": firstname,
        "lastName": lastname,
        "gender": gender,
        "country": "Poland",
        "city": "Gdansk",
        "streetWithHouseNumber": random.choice(streets),
        "postCode": random.choice(post_codes),
        "pesel": "50122671828",
        "dateOfBirth": "1950-12-26",
        "email": f"{firstname.lower()}fizjo@wp.pl",  # Użyj lowercase w e-mailu
        "password": "zaq1@WSX",
        "confirmPassword": "zaq1@WSX",
        "phoneNumber": f"{random.randint(100000000, 999999999)}"
    }
    add_physio(API_URL_REGISTER_PHYSIO, fizjo)

def patientAdminAdd(firstname, lastname, gender):
    Pacjent = {
        "licenseNumber": f"LIC{random.randint(1000, 9999)}",
        "firstName": firstname,
        "lastName": lastname,
        "gender": gender,
        "country": "Poland",
        "city": "Gdansk",
        "streetWithHouseNumber": random.choice(streets),
        "postCode": random.choice(post_codes),
        "pesel": "50122671828",
        "dateOfBirth": "1950-12-26",
        "email": f"{firstname.lower()}pacjent@wp.pl",  # Użyj lowercase w e-mailu
        "password": "zaq1@WSX",
        "confirmPassword": "zaq1@WSX",
        "phoneNumber": f"{random.randint(100000000, 999999999)}"
    }
    add_physio(API_URL_REGISTER_PHYSIO, Pacjent)

patientAdminAdd("Michal", "Rychert", "Male")
fizjoAdminAdd("Michal", "Rychert", "Male")

patientAdminAdd("Szymon", "Marcinkowski", "Male")
fizjoAdminAdd("Szymon", "Marcinkowski", "Male")

patientAdminAdd("Dominika", "Korol", "Female")
fizjoAdminAdd("Dominika", "Korol", "Female")