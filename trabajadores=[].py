trabajadores = []

cargos_predefinidos=["ceo" ,"analista de datos", "desarrollador","analista programador"]

cargo=""

def crear_trabajador():
    
    nombre = input("Ingrese su nombre: ")
    
    
    cargo = input("Ingrese el cargo: ").lower()
    if cargo in cargos_predefinidos:
        print("Acceso concedido")
    else:
        print("Cargo no existente o mal escrito. Porfavor ingrese denuevo")
        return
    try:
        sueldo = int(input("Ingrese su sueldo: "))
    except ValueError:
        print("Ingrese solo números enteros (sin puntos ni comas)")
        return
    
    descuentoAFP = sueldo * 0.12
    descuentoSalud = sueldo * 0.07
    sueldoLiquido = sueldo - descuentoAFP - descuentoSalud
    
    trabajador = {
        "nombre": nombre,
        "cargo": cargo,
        "sueldo": sueldo,
        "descuentoAFP": descuentoAFP,
        "descuentoSalud": descuentoSalud,
        "sueldoLiquido": sueldoLiquido
    }
    
    trabajadores.append(trabajador)

def lista_trabajadores():
    if not trabajadores:
        print("No se han registrado trabajadores")
    else:
        for trabajador in trabajadores:
            print(f"Nombre: {trabajador['nombre']}")
            print(f"Cargo: {trabajador['cargo']}")
            print(f"Sueldo: {trabajador['sueldo']}")
            print(f"Descuento AFP: {trabajador['descuentoAFP']}")
            print(f"Descuento Salud: {trabajador['descuentoSalud']}")
            print(f"Sueldo Líquido: {trabajador['sueldoLiquido']}")
            print("-" * 30)
            
            

def imprimir_Plantilla():
    confirmacion=input("Desea imprimir toda la plantilla de trabajadores (Si/No)").lower()
    if confirmacion=="si":
        filename="plantilla_todos.txt"
        with open(filename, "w") as archive:
            for trabajador in trabajadores:
                archive.write(f"Nombre: {trabajador['nombre']} | Cargo: {trabajador['cargo']} | Sueldo Bruto: {trabajador['sueldo']} | Descuento AFP: {trabajador['descuentoAFP']} | Descuento Salud: {trabajador['descuentoSalud']} | Sueldo Líquido: {trabajador['sueldoLiquido']}")
    else:
        filename="Plantilla_cargo"
        with open(filename, "w") as archive:
            for trabajador in trabajadores:
                archive
    
while True:
    print("="*40)
    print("1.- Registrar trabajador")
    print("2.- Lista de trabajadores")
    print("3.- Imprimir planilla de sueldos")
    print("4.- Salir")
    print("="*40)
    
    opc=int(input("Ingrese una opcion (numeros)"))
    match opc:
        case 1:
            crear_trabajador()
        case 2:
            lista_trabajadores()
        case 3:
            imprimir_Plantilla()