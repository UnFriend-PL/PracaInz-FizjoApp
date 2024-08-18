"use client";
import { useParams } from "next/navigation";
import styles from "./appointmentDetails.module.scss";
import HumanBody from "@/app/components/common/humanBody/humanBody";
const Appointments = () => {
  const params = useParams();
  const appointment = params.appointment;
  return (
    <>
      <HumanBody />
    </>
  );
};

export default Appointments;
