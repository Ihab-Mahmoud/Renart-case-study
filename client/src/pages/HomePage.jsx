import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLoaderData } from "react-router";

// ✅ Loader: loads doctors (optionally filtered by branch)
export const Loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    // You can change this endpoint to match your backend
    // Example: /api/v1/doctors?branch=cardiology
    const { data } = await axios.get("/api/v1/doctors", { params });
    console.log(data);
    
    return { params, data };
  } catch (error) {
    console.log(error);
    // return something consistent so UI can show error state
    return { params, data: null, error: true };
  }
};  

const HomePage = () => {
  const loader = useLoaderData();
  const { data, params, error } = loader || {};

  // ---------------------------
  // UI State
  // ---------------------------
  const scrollRef = useRef(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  // ---------------------------
  // 1) LOGIN (prototype)
  // ---------------------------
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!auth.email || !auth.password) {
      setLoginError("Lütfen email ve şifre alanlarını doldurun.");
      return;
    }

    try {
      // If you already have auth endpoint, use it:
      // await axios.post("/api/v1/auth/login", auth);

      // ✅ PROTOTYPE fallback (no backend):
      if (auth.email === "test@test.com" && auth.password === "1234") {
        setIsLoggedIn(true);
      } else {
        setLoginError("Email veya şifre hatalı. (Demo: test@test.com / 1234)");
      }
    } catch (err) {
      setLoginError("Giriş başarısız. Lütfen tekrar deneyin.");
    }
  };

  // ---------------------------
  // 2) BRANCH SELECT + DOCTOR LISTING
  // ---------------------------
  const branchOptions = [
    { value: "", label: "Branş seçiniz" },
    { value: "kardiyoloji", label: "Kardiyoloji" },
    { value: "ortopedi", label: "Ortopedi" },
    { value: "dermatoloji", label: "Dermatoloji" },
  ];

  const [branch, setBranch] = useState(params?.branch || "");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Doctors array: supports both "data.data" style and plain arrays
  const doctors = useMemo(() => {
    // expected backend response: { data: [...] }
    const arr = data?.data ?? data ?? [];
    return Array.isArray(arr) ? arr : [];
  }, [data]);

  // Optional: client-side filter if backend does not filter by branch yet
  const filteredDoctors = useMemo(() => {
    if (!branch) return doctors;
    return doctors.filter(
      (d) =>
        (d.branch || d.specialty || "").toLowerCase() === branch.toLowerCase()
    );
  }, [doctors, branch]);

  // Empty / error states required by rubric
  const showEmpty = isLoggedIn && branch && filteredDoctors.length === 0 && !error;
  const showLoadError = isLoggedIn && !!error;

  // ---------------------------
  // 3) APPOINTMENT CONFIRM (save)
  // ---------------------------
  const [appointmentStatus, setAppointmentStatus] = useState({
    loading: false,
    message: "",
    type: "", // "success" | "error"
  });

  const createAppointment = async () => {
    if (!selectedDoctor) {
      setAppointmentStatus({
        loading: false,
        message: "Lütfen önce bir doktor seçin.",
        type: "error",
      });
      return;
    }

    setAppointmentStatus({ loading: true, message: "", type: "" });

    try {
      // ✅ Real backend (recommended if you have it)
      // await axios.post("/api/v1/appointments", {
      //   doctorId: selectedDoctor._id,
      //   branch,
      //   date: new Date().toISOString(),
      // });

      // ✅ PROTOTYPE fallback (simulate db write)
      await new Promise((r) => setTimeout(r, 600));

      setAppointmentStatus({
        loading: false,
        message: "Randevu başarıyla oluşturuldu. (Prototip simülasyon)",
        type: "success",
      });
    } catch (err) {
      setAppointmentStatus({
        loading: false,
        message: "Randevu oluşturulamadı. Lütfen tekrar deneyin.",
        type: "error",
      });
    }
  };

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="p-3">
      <h2 className="p-3" style={{ fontWeight: "300", marginTop: "30px" }}>
        Klinik Randevu Prototipi (Demo)
      </h2>

      {/* 1) LOGIN */}
      {!isLoggedIn && (
        <form className="bg-white rounded-lg shadow-md text-center align-items-center  w-full max-w-md py-4 px-4 d-flex flex-column  " onSubmit={handleLogin}>
          <h3 className="text-lg font-medium mb-2 text-center"> Login</h3>

          <input
            type="email"
            placeholder="Email"
            className="w-50 border rounded p-2 mt-2"
            value={auth.email}
            onChange={(e) => setAuth((p) => ({ ...p, email: e.target.value }))}
          />

          <input
            type="password"
            placeholder="Şifre"
            className="w-50  border rounded p-2 mt-2"
            value={auth.password}
            onChange={(e) => setAuth((p) => ({ ...p, password: e.target.value }))}
          />

          {loginError && (
            <div className="mt-2 text-sm text-red-600">{loginError}</div>
          )}

          <button
            type="submit"
            className="bg-pink-600 text-dark font-medium py-2 px-4 rounded-md hover:bg-pink-700 transition border rounded w-50  mt-3"
          >
            Giriş Yap
          </button>

          <div className="text-xs text-gray-500 mt-2">
            Demo giriş: <b>test@test.com</b> / <b>1234</b>
          </div>
        </form>
      )}

      {/* After login */}
      {isLoggedIn && (
        <>
          {/* 2) DOCTOR LISTING */}
          <div className="bg-white rounded-lg shadow-md w-full max-w-md py-4 px-4 mt-4">
            <h3 className="text-lg font-medium mb-2"> Doktor Listeleme</h3>

            <select
              className="w-full border rounded p-2"
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
                setSelectedDoctor(null);
                setAppointmentStatus({ loading: false, message: "", type: "" });
              }}
            >
              {branchOptions.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>

            {showLoadError && (
              <div className="mt-2 text-sm text-red-600">
                Doktor verileri alınamadı. (Hata durumu)
              </div>
            )}

            {showEmpty && (
              <div className="mt-2 text-sm text-gray-600">
                Bu branş için uygun doktor bulunamadı. (Boş durum)
              </div>
            )}
          </div>

          {/* Doctors carousel */}
          {branch && filteredDoctors.length > 0 && (
            <div className="carousel-wrapper mt-4">
              <button className="scroll-button left" onClick={scrollLeft}>
                <FaChevronLeft />
              </button>

              <div className="scroll-container" ref={scrollRef} style={{ display: "flex", gap: 12, overflowX: "auto" }}>
                {filteredDoctors.map((doc) => {
                  const name = doc.name || doc.fullName || "Doktor";
                  const spec = doc.branch || doc.specialty || branch;
                  const hospital = doc.hospital || doc.clinic || "Klinik";

                  const isSelected = selectedDoctor?._id
                    ? selectedDoctor._id === doc._id
                    : selectedDoctor?.name === name;

                  return (
                    <div
                      key={doc._id || name}
                      className={`bg-white rounded-lg shadow-md p-3 min-w-[220px] border ${
                        isSelected ? "border-pink-600" : "border-gray-200"
                      }`}
                    >
                      <div className="text-base font-medium">{name}</div>
                      <div className="text-sm text-gray-600">{spec}</div>
                      <div className="text-xs text-gray-500 mt-1">{hospital}</div>

                      <button
                        className="mt-3 bg-pink-600 text-dark font-medium py-2 px-3 rounded-md hover:bg-pink-700 transition border rounded w-full"
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setAppointmentStatus({ loading: false, message: "", type: "" });
                        }}
                      >
                        Doktoru Seç
                      </button>
                    </div>
                  );
                })}
              </div>

              <button className="scroll-button right" onClick={scrollRight}>
                <FaChevronRight />
              </button>
            </div>
          )}

          {/* 3) APPOINTMENT CONFIRM */}
          <div className="bg-white rounded-lg shadow-md w-full max-w-md py-4 px-4 mt-4">
            <h3 className="text-lg font-medium mb-2"> Randevu Onay</h3>

            <div className="text-sm text-gray-700">
              Seçili Doktor:{" "}
              <b>{selectedDoctor ? (selectedDoctor.name || selectedDoctor.fullName) : "—"}</b>
            </div>

            <button
              className="mt-3 bg-pink-600 text-dark font-medium py-2 px-4 rounded-md hover:bg-pink-700 transition border rounded w-full"
              onClick={createAppointment}
              disabled={appointmentStatus.loading}
            >
              {appointmentStatus.loading ? "Kaydediliyor..." : "Randevu Al"}
            </button>

            {appointmentStatus.message && (
              <div
                className={`mt-2 text-sm ${
                  appointmentStatus.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {appointmentStatus.message}
              </div>
            )}
          </div>

          <button
            className="mt-3 bg-pink-600 text-dark font-medium py-2 px-4 rounded-md hover:bg-pink-700 transition border rounded w-full"
            onClick={() => {
              setIsLoggedIn(false);
              setAuth({ email: "", password: "" });
              setBranch("");
              setSelectedDoctor(null);    
              setLoginError("");
              setAppointmentStatus({ loading: false, message: "", type: "" });
            }}
          >
            Çıkış Yap
          </button>
        </>
      )}
    </div>
  );
};

export default HomePage;
