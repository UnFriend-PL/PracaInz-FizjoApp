import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

LOGIN_URL = "https://localhost:7023/Account/Login"
APPOINTMENTS_URL = "https://localhost:7023/Appointments/All?Status=0&Page="
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
    
    all_appointments = []
    page = 0
    while True:
        try:
            response = requests.get(APPOINTMENTS_URL + str(page), headers=headers, verify=False)
            if response.status_code == 200 and response.json().get("success"):
                appointments = response.json()["data"]["appointments"]
                if not appointments:
                    break 
                all_appointments.extend(appointments)
                page += 1
            else:
                print("Błąd pobierania wizyt:", response.json().get("message"))
                break
        except Exception as e:
            print("Wystąpił błąd podczas pobierania wizyt:", e)
            break
    print(f"Znaleziono łącznie {len(all_appointments)} wizyt.")
    return all_appointments

def add_opinion(token, appointment_id, comment, rating):
    headers = {
        "Authorization": f"Bearer {token}"
    }
    payload = {
        "appointmentId": appointment_id,
        "comment": comment,
        "rating": rating
    }

    try:
        response = requests.post(ADD_OPINION_URL, headers=headers, json=payload, verify=False)
        if response.status_code == 200 and response.json().get("success"):
            print(f"Opinia dla wizyty {appointment_id} została dodana pomyślnie.")
        else:
            print(f"Błąd dodawania opinii dla wizyty {appointment_id}:", response.json().get("message"))
    except Exception as e:
        print(f"Wystąpił błąd podczas dodawania opinii dla wizyty {appointment_id}:", e)

def main():
    for i in range(1, 11):
        email = f"patient{i}@example.com"
        password = "Password12#"

        token = login(email, password)
        if not token:
            continue

        appointments = get_all_appointments(token)

        for appointment in appointments:
            appointment_id = appointment["appointmentId"]
            comment = "Bardzo profesjonalna wizyta." 
            rating = 5 
            add_opinion(token, appointment_id, comment, rating)

if __name__ == "__main__":
    main()
