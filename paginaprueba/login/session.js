// auth.js - Sistema de autenticación para HuertoHogar

// Elementos del DOM
const authRegisterForm = document.getElementById("registerForm");
const authLoginForm = document.getElementById("loginForm");
const authRegisterContainer = document.getElementById("register-container");
const authLoginContainer = document.getElementById("login-container");
const authLandingPage = document.getElementById("landingPage");
const authLogoutBtn = document.getElementById("logoutBtn");
const authErrorRegistro = document.getElementById("errorRegistro");
const authErrorLogin = document.getElementById("errorLogin");
const authGoLogin = document.getElementById("goLogin");
const authGoRegister = document.getElementById("goRegister");

// lo del mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function clearErrors() {
    if (authErrorRegistro) authErrorRegistro.innerText = "";
    if (authErrorLogin) authErrorLogin.innerText = "";
}


function showSuccessMessage(element, message) {
    element.style.color = "#2E8B57";
    element.innerText = message;
    setTimeout(() => {
        element.innerText = "";
        element.style.color = "#d32f2f";
    }, 3000);
}

// LO QUE ME SACO DE QUISIO
if (authGoLogin) {
    authGoLogin.addEventListener("click", (e) => {
        e.preventDefault();
        authRegisterContainer.classList.add("hidden");
        authLoginContainer.classList.remove("hidden");
        clearErrors();
    });
}

if (authGoRegister) {
    authGoRegister.addEventListener("click", (e) => {
        e.preventDefault();
        authLoginContainer.classList.add("hidden");
        authRegisterContainer.classList.remove("hidden");
        clearErrors();
    });
}


if (authRegisterForm) {
    authRegisterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const correo = document.getElementById("correo").value.trim();
        const clave1 = document.getElementById("clave1").value.trim();
        const clave2 = document.getElementById("clave2").value.trim();

        // Validaciones básicas
        if (!correo) {
            authErrorRegistro.innerText = "El correo es obligatorio";
            return;
        }

        if (!isValidEmail(correo)) {
            authErrorRegistro.innerText = "Por favor ingresa un correo válido";
            return;
        }

        if (!clave1) {
            authErrorRegistro.innerText = "La contraseña es obligatoria";
            return;
        }

        if (clave1.length < 6) {
            authErrorRegistro.innerText = "La contraseña debe tener al menos 6 caracteres";
            return;
        }

        if (clave1 !== clave2) {
            authErrorRegistro.innerText = "Las contraseñas no coinciden";
            return;
        }

        
        const usuarioExistente = localStorage.getItem("usuario");
        if (usuarioExistente === correo) {
            authErrorRegistro.innerText = "Este correo ya está registrado";
            return;
        }

        
        try {
            localStorage.setItem("usuario", correo);
            localStorage.setItem("clave", clave1);
            localStorage.setItem("fechaRegistro", new Date().toISOString());

            
            showSuccessMessage(authErrorRegistro, "¡Registro exitoso! Ahora puedes iniciar sesión.");
            
            
            authRegisterForm.reset();
            
            
            setTimeout(() => {
                authRegisterContainer.classList.add("hidden");
                authLoginContainer.classList.remove("hidden");
            }, 2000);

        } catch (error) {
            authErrorRegistro.innerText = "Error al registrar usuario. Intenta nuevamente.";
        }
    });
}


if (authLoginForm) {
    authLoginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const correo = document.getElementById("loginCorreo").value.trim();
        const clave = document.getElementById("loginClave").value.trim();

        
        if (!correo) {
            authErrorLogin.innerText = "El correo es obligatorio";
            return;
        }

        if (!clave) {
            authErrorLogin.innerText = "La contraseña es obligatoria";
            return;
        }

        
        const usuarioGuardado = localStorage.getItem("usuario");
        const claveGuardada = localStorage.getItem("clave");

        if (correo === usuarioGuardado && clave === claveGuardada) {
            try {
                
                localStorage.setItem("logueado", "true");
                localStorage.setItem("fechaLogin", new Date().toISOString());
                
                
                authLoginContainer.classList.add("hidden");
                authRegisterContainer.classList.add("hidden");
                authLandingPage.classList.remove("hidden");
                
                clearErrors();
                
                
                authLoginForm.reset();
                
            } catch (error) {
                authErrorLogin.innerText = "Error al iniciar sesión. Intenta nuevamente.";
            }
        } else {
            authErrorLogin.innerText = "Correo o contraseña incorrectos";
        }
    });
}


window.addEventListener("load", () => {
    try {
        const logueado = localStorage.getItem("logueado");
        const usuario = localStorage.getItem("usuario");
        
        if (logueado === "true" && usuario) {
            if (authLandingPage) authLandingPage.classList.remove("hidden");
            if (authRegisterContainer) authRegisterContainer.classList.add("hidden");
            if (authLoginContainer) authLoginContainer.classList.add("hidden");
        } else {
            if (authRegisterContainer) authRegisterContainer.classList.remove("hidden");
            if (authLoginContainer) authLoginContainer.classList.add("hidden");
            if (authLandingPage) authLandingPage.classList.add("hidden");
        }
    } catch (error) {
        console.error("Error al verificar sesión:", error);
        if (authRegisterContainer) authRegisterContainer.classList.remove("hidden");
        if (authLoginContainer) authLoginContainer.classList.add("hidden");
        if (authLandingPage) authLandingPage.classList.add("hidden");
    }
});


if (authLogoutBtn) {
    authLogoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        try {
            localStorage.removeItem("logueado");
            localStorage.removeItem("fechaLogin");
            
            
            authLandingPage.classList.add("hidden");
            authLoginContainer.classList.remove("hidden");
            authRegisterContainer.classList.add("hidden");
            
            clearErrors();
            
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    });
}

// ESTO TODAVIA NO FUNCIONA EKISDE
function resetAllData() {
    try {
        localStorage.removeItem("usuario");
        localStorage.removeItem("clave");
        localStorage.removeItem("logueado");
        localStorage.removeItem("fechaRegistro");
        localStorage.removeItem("fechaLogin");
        
        window.location.reload();
    } catch (error) {
        console.error("Error al limpiar datos:", error);
    }
}

window.resetAllData = resetAllData;