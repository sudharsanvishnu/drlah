import React, { useEffect, useRef, useState } from "react";
import "./DeviceInfo.css";

const DeviceInfo = () => {
  const DeviceSelection = () => {
    const [deviceType, setDeviceType] = useState("primary");
    const [bringYourOwn, setBringYourOwn] = useState(true);
    const [serial, setSerial] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);

    function onPickFile() {
      if (!bringYourOwn) return;
      fileInputRef.current?.click();
    }

    function onFileChange(e) {
      const file = e.target.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setFileName(file.name);
    }

    useEffect(() => {
      return () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
      };
    }, [previewUrl]);

    return (
      <>
        <section className="device-section">
          <h2 className="title">Device 1</h2>

          <div className="device-grid">
            <div className="col">
              <label className="label" htmlFor="deviceType">
                Device type
              </label>
              <select
                id="deviceType"
                className="field"
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
              >
                <option value="primary">Primary GPS</option>
                <option value="secondary">Secondary GPS</option>
                <option value="obd">OBD</option>
                <option value="hardwired">Hardwired</option>
              </select>

              <label className="label" htmlFor="serial">
                Serial number
              </label>
              <input
                id="serial"
                className="field"
                type="text"
                placeholder="Enter the serial number of the device"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                disabled={!bringYourOwn}
              />
            </div>

            <div className="col">
              <div className="toggle-row">
                <div className="toggle-text">
                  <label className="label" htmlFor="byo">
                    Bringing your own device?
                  </label>
                  <p className="hint">
                    Toggle this on if you're bringing your own device. Leave it
                    off if we are to provide the device.
                  </p>
                </div>

                <div className="switch-wrap">
                  <input
                    id="byo"
                    type="checkbox"
                    className="switch-input"
                    checked={bringYourOwn}
                    onChange={(e) => setBringYourOwn(e.target.checked)}
                  />
                  <label htmlFor="byo" className="switch" />
                </div>
              </div>

              <label className="label">Upload an image of the device</label>
              <div
                className={`upload ${bringYourOwn ? "" : "disabled"}`}
                role="button"
                tabIndex={0}
                onClick={onPickFile}
                onKeyDown={(e) => (e.key === "Enter" ? onPickFile() : null)}
              >
                {previewUrl ? (
                  <>
                    <img className="preview" src={previewUrl} alt="Device" />
                    <div className="file-name">{fileName}</div>
                  </>
                ) : (
                  <span className="upload-cta">Click to upload</span>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{ display: "none" }}
                disabled={!bringYourOwn}
              />
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="dev-main-content">
      <div className="dev-padding">
        <div className="dev-title">Device management</div>
        <div className="dev-description">
          Add details of the device, if any already installed on your car. If
          none, then continue to next step.
        </div>
      </div>
      <div className="dev-line" />
      {[1, 2, 3, 4].map((item, index) => {
        return (
          <>
            <div className="dev-padding">
              <DeviceSelection />
            </div>
            <div className="dev-line" />
          </>
        );
      })}
    </div>
  );
};

export default DeviceInfo;
