import subprocess

files_to_run = ["AddingPhysiotherapistsAndPatients.py", "AddingAppointments.py", "AddingOpinions.py"]

for file in files_to_run:
    try:
        subprocess.run(["python", file], check=True)
        print(f"Uruchomiono {file} pomyślnie")
    except subprocess.CalledProcessError as e:
        print(f"Błąd przy uruchamianiu {file}: {e}")