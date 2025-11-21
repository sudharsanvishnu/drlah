import React, { useEffect, useRef, useState } from "react";
import "./DeviceInfo.css";

const STORAGE_KEY = "device_info_data";

const DeviceInfo = () => {
  // Create unique device objects with IDs
  const [devices] = useState([
    { id: "device-1", number: 1 },
    { id: "device-2", number: 2 },
    { id: "device-3", number: 3 },
    { id: "device-4", number: 4 },
  ]);

  const DeviceSelection = ({ deviceId, deviceNumber }) => {
    const [deviceType, setDeviceType] = useState("primary");
    const [bringYourOwn, setBringYourOwn] = useState(false);
    const [serial, setSerial] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [fileName, setFileName] = useState("");
    const [imageData, setImageData] = useState(null); // Store base64 for localStorage
    const fileInputRef = useRef(null);
    const isInitialLoad = useRef(true); // Track if initial load is complete
    const previousBringYourOwn = useRef(bringYourOwn); // Track previous toggle state

    // Load device data from localStorage on mount
    useEffect(() => {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          const deviceData = parsedData[deviceId];
          if (deviceData) {
            // Batch all state updates and mark load complete after
            setDeviceType(deviceData.deviceType || "primary");
            setBringYourOwn(
              deviceData.bringYourOwn !== undefined
                ? deviceData.bringYourOwn
                : false
            );
            setSerial(deviceData.serial || "");
            setFileName(deviceData.fileName || "");

            // Restore image from base64 if exists
            if (deviceData.imageData) {
              setPreviewUrl(deviceData.imageData);
              setImageData(deviceData.imageData);
            }
          }
        } catch (error) {
          console.error("Error loading device data:", error);
        }
      }
      // Use setTimeout to ensure this runs after all state updates are processed
      setTimeout(() => {
        isInitialLoad.current = false;
      }, 0);
    }, [deviceId]);

    // Clear serial number and image when toggle is turned off
    useEffect(() => {
      // Skip during initial load
      if (isInitialLoad.current) {
        previousBringYourOwn.current = bringYourOwn;
        return;
      }

      // When bringYourOwn changes from true to false, clear serial and image data
      if (previousBringYourOwn.current && !bringYourOwn) {
        setSerial("");
        setFileName("");
        setPreviewUrl("");
        setImageData(null);
      }

      // Update the previous value
      previousBringYourOwn.current = bringYourOwn;
    }, [bringYourOwn]);

    // Save device data to localStorage whenever it changes (but not during initial load)
    useEffect(() => {
      // Skip saving during initial load to prevent overwriting with default values
      if (isInitialLoad.current) {
        return;
      }

      const deviceData = {
        deviceType,
        bringYourOwn,
        serial,
        fileName,
        imageData,
      };

      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        let allDeviceData = savedData ? JSON.parse(savedData) : {};

        // Only save if data has actually changed
        const existingData = allDeviceData[deviceId];
        const hasChanged =
          !existingData ||
          existingData.deviceType !== deviceType ||
          existingData.bringYourOwn !== bringYourOwn ||
          existingData.serial !== serial ||
          existingData.fileName !== fileName ||
          existingData.imageData !== imageData;

        if (hasChanged) {
          allDeviceData[deviceId] = deviceData;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(allDeviceData));
        }
      } catch (error) {
        console.error("Error saving device data:", error);
      }
    }, [deviceType, bringYourOwn, serial, fileName, imageData, deviceId]);

    function onPickFile() {
      if (!bringYourOwn) return;
      fileInputRef.current?.click();
    }

    function onFileChange(e) {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreviewUrl(base64String);
        setImageData(base64String);
      };
      reader.readAsDataURL(file);

      setFileName(file.name);
    }

    useEffect(() => {
      return () => {
        if (previewUrl && previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    }, [previewUrl]);

    const uniqueId = deviceId;

    return (
      <>
        <section className="device-section">
          <div className="title">Device {deviceNumber}</div>

          <div className="device-grid">
            <div className="col">
              <label className="label" htmlFor={`deviceType-${uniqueId}`}>
                Device type
              </label>
              <select
                id={`deviceType-${uniqueId}`}
                className="field"
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
              >
                <option value="primary">Primary GPS</option>
                <option value="secondary">Secondary GPS</option>
                <option value="obd">OBD</option>
                <option value="hardwired">Hardwired</option>
              </select>

              <div
                className={`device-content-transition ${
                  bringYourOwn ? "device-content-visible" : ""
                }`}
              >
                <label className="label" htmlFor={`serial-${uniqueId}`}>
                  Serial number
                </label>
                <input
                  id={`serial-${uniqueId}`}
                  className="field margin-bottom-20"
                  type="text"
                  placeholder="Enter the serial number of the device"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="toggle-row">
                <div className="toggle-text">
                  <p className="bring-label">Bringing your own device?</p>
                  <p className="hint">
                    Toggle this on if you're bringing your own device. Leave it
                    off if we are to provide the device.
                  </p>
                </div>

                <div className="switch-wrap">
                  <input
                    id={`byo-${uniqueId}`}
                    type="checkbox"
                    className="switch-input"
                    checked={bringYourOwn}
                    onChange={(e) => setBringYourOwn(e.target.checked)}
                  />
                  <label htmlFor={`byo-${uniqueId}`} className="switch" />
                </div>
              </div>

              <div
                className={`upload-section-transition ${
                  bringYourOwn ? "upload-section-visible" : ""
                }`}
              >
                <label className="label">Upload an image of the device</label>
                <div
                  className="upload"
                  role="button"
                  tabIndex={bringYourOwn ? 0 : -1}
                  onClick={onPickFile}
                  onKeyDown={(e) => (e.key === "Enter" ? onPickFile() : null)}
                  style={{ pointerEvents: bringYourOwn ? "auto" : "none" }}
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
      {devices.map((device) => {
        return (
          <React.Fragment key={device.id}>
            <div className="dev-padding">
              <DeviceSelection
                deviceId={device.id}
                deviceNumber={device.number}
              />
            </div>
            <div className="dev-line" />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DeviceInfo;
