"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Step1Card from "@/components/Step1Card";
import Step2Card from "@/components/Step2Card";
import Step3Card from "@/components/Step3Card";
import styles from "./CreateSchedulePage.module.css";

export default function CreateSchedulePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [tripName, setTripName] = useState(""); 
    const [tripDays, setTripDays] = useState("");
    const [tripStyle, setTripStyle] = useState("");
    
    // 다음 단계로 넘어가는 함수
    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Step 3에서 다음 단계로 넘어갈 때 tripStyle에 따라 라우팅
            if (tripStyle === 'random') {
                router.push('/GameMode');
            } else if (tripStyle === 'select') {
                router.push('/SelectAreaPage');
            } else if (tripStyle === 'current') {
                // 현재 위치로 보기 선택 시 처리 (필요에 따라 다른 페이지로 라우팅)
                alert('현재 위치 기능은 준비 중입니다.');
            }
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
            <img
                src="/GMG_LOGO.png"
                alt="GMG_LOGO"
                width={193}
                height={193}
            />
            {renderStepCard()}
        </div>
    )
}