"use client";

// import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Step1Card from "@/components/Step1Card";
import Step2Card from "@/components/Step2Card";
import Step3Card from "@/components/Step3Card";
import styles from "./CreateSchedulePage.module.css";

export default function CreateSchedulePage() {
    const [step, setStep] = useState(1);
    const [tripName, setTripName] = useState(""); 
    const [tripDays, setTripDays] = useState("");
    const [tripStyle, setTripStyle] = useState("");
    
    // 다음 단계로 넘어가는 함수
    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
        if (step === 3) {
            alert("일정 생성이 완료되었습니다!");
            console.log(tripName, tripDays, tripStyle);
        }
    };
    
    // 이전 단계로 돌아가는 함수
    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };
    
    // 현재 step에 따라 렌더링할 컴포넌트 결정
    const renderStepCard = () => {
        switch (step) {
            case 1:
                return <Step1Card onNext={handleNextStep} tripName={tripName} setTripName={setTripName} />;
            case 2:
                return <Step2Card onNext={handleNextStep} onPrev={handlePrevStep} tripDays={tripDays} setTripDays={setTripDays} />;
            case 3:
                return <Step3Card onPrev={handlePrevStep} onNext={handleNextStep} tripStyle={tripStyle} setTripStyle={setTripStyle} />;
            default:
                return <Step1Card onNext={handleNextStep} tripName={tripName} setTripName={setTripName} />;
        }
    };

    return (
        <div className={styles.container}>
            <Image
                src="/GMG_LOGO.png"
                alt="GMG_LOGO"
                width={193}
                height={193}
            />
            {renderStepCard()}
        </div>
    )
}