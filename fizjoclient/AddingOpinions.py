import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

LOGIN_URL = "https://localhost:7023/Account/Login"
APPOINTMENTS_URL = "https://localhost:7023/api/v1/Appointments/All"
ADD_OPINION_URL = "https://localhost:7023/Opinion/AddOpinion"

def login(email, password):
    payload = {
        "email": email,
        "password": password,
        "loginType": "string"
    }

    try:
        response = requests.post(LOGIN_URL, json=payload, verify=False) 
        if response.status_code == 200 and response.json().get("success"):
            token = response.json()["data"]
            print(f"Zalogowano pomyślnie jako {email}.")
            return token
        else:
            print(f"Błąd logowania dla {email}:", response.json().get("message"))
    except Exception as e:
        print(f"Wystąpił błąd podczas logowania dla {email}:", e)
    return None

def get_all_appointments(token):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    appInfo = {
        "page": 0,
        "status": 1
    }
    all_appointments = []
    try:
        response = requests.post(APPOINTMENTS_URL, headers=headers, json=appInfo, verify=False)
        if response.status_code == 200 and response.json().get("success"):
            appointments = response.json()["data"]["appointments"]
            if appointments:
                all_appointments.extend(appointments)
            else:
                print("Brak wizyt dla podanego statusu i strony.")
        else:
            print("Błąd pobierania wizyt:", response.json().get("message"))
    except Exception as e:
        print("Wystąpił błąd podczas pobierania wizyt:", e)
    print(f"Znaleziono {len(all_appointments)} wizyt na stronie 1.")
    return all_appointments

def add_opinion(token, physio_id, comment, rating):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    payload = {
        "physiotherapistId": physio_id,
        "comment": comment,
        "rating": rating
    }

    try:
        response = requests.post(ADD_OPINION_URL, headers=headers, json=payload, verify=False)
        if response.status_code == 200 and response.json().get("success"):
            print(f"Opinia dla fizjoterapeuty {physio_id} została dodana pomyślnie.")
        else:
            print(f"Błąd dodawania opinii dla fizjoterapeuty {physio_id}:", response.json().get("message"))
    except Exception as e:
        print(f"Wystąpił błąd podczas dodawania opinii dla fizjoterapeuty {physio_id}:", e)

def main():
    for i in range(1, 11):
        email = f"patient{i}@example.com"
        password = "Password12#"

        token = login(email, password)
        if not token:
            continue

        appointments = get_all_appointments(token)

        for appointment in appointments:
            physio_id = appointment["physiotherapistId"]
            comment = "Bardzo profesjonalna wizyta." 
            rating = 5 
            add_opinion(token, physio_id, comment, rating)

if __name__ == "__main__":
    main()
