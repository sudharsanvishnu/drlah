import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar.js";
import MainContent from "../components/MainContent/MainContent.js";
import "../App.css";
import Footer from "../components/Footer/Footer.js";
import DeviceInfo from "../components/Device/DeviceInfo.js";

const STATIC_SIDEBAR_ITEMS = [
  { name: "Location", completed: true },
  { name: "About", completed: true },
  { name: "Features", completed: true },
  { name: "Rules", completed: true },
  { name: "Pricing", completed: true },
  { name: "Promotion", completed: true },
  { name: "Pictures", completed: true },
  { name: "Insurance", completed: true },
];

const STEPS = {
  SUBSCRIPTION: "subscription",
  DEVICE: "device",
};

function Home() {
  const [activeStep, setActiveStep] = useState(STEPS.SUBSCRIPTION);

  const sidebarItems = useMemo(() => {
    const isSubscriptionStep = activeStep === STEPS.SUBSCRIPTION;

    return [
      ...STATIC_SIDEBAR_ITEMS,
      {
        name: "Subscription",
        completed: !isSubscriptionStep,
        active: isSubscriptionStep,
      },
      {
        name: "Device",
        completed: false,
        active: !isSubscriptionStep,
      },
      { name: "Easy Access", completed: false, active: false },
    ];
  }, [activeStep]);

  const handleNextStep = () => {
    if (activeStep !== STEPS.DEVICE) {
      setActiveStep(STEPS.DEVICE);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep !== STEPS.SUBSCRIPTION) {
      setActiveStep(STEPS.SUBSCRIPTION);
    }
  };

  const canGoNext = activeStep === STEPS.SUBSCRIPTION;
  const canGoBack = activeStep === STEPS.DEVICE;

  const plans = [
    {
      id: 1,
      title: "Just mates",
      features: [
        { icon: "/gps.svg", text: "Bring your own GPS" },
        { icon: "/mielage.svg", text: "Mileage reporting to be done by you" },
        { icon: "Lock.svg", text: "In-person key handover to guests" },
      ],
      price: "Free",
    },
    {
      id: 2,
      title: "Good mates",
      features: [
        { icon: "/gps.svg", text: "Primary GPS included" },
        { icon: "/mielage.svg", text: "Automated mileage calculations" },
        { icon: "/Lock.svg", text: "In-person key handover to guests" },
      ],
      price: "$10",
      period: "/month",
    },
    {
      id: 3,
      title: "Best mates",
      features: [
        { icon: "/gps.svg", text: "Keyless access technology" },
        { icon: "mielage.svg", text: "Automated mileage calculations" },
        { icon: "Lock.svg", text: "Remote handover to guests" },
      ],
      price: "$30",
      period: "/month",
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="app-container">
        <Sidebar items={sidebarItems} />
        {canGoNext ? <MainContent plans={plans} /> : <DeviceInfo />}
      </div>
      <Footer
        onNext={handleNextStep}
        onBack={handlePreviousStep}
        canGoNext={canGoNext}
        canGoBack={canGoBack}
      />
    </div>
  );
}

export default Home;
