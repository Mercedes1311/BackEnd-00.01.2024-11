//18. Hacer un algoritmo en Pseint para una empresa se encarga de la venta y distribuci�n de CD v�rgenes. Los clientes pueden adquirir los art�culos (supongamos un �nico producto de una �nica marca) por cantidad. Los precios son:
//			$10. Si se compran unidades separadas hasta 9.
//			$8. Si se compran entre 10 unidades hasta 99.
//			$7. Entre 100 y 499 unidades.
//			$6. Para mas de 500 unidades.
//			La ganancia para el vendedor es de 8,25 % de la venta. Realizar un algoritmo en Pseint que dado un n�mero de CDs a vender calcule el precio total para el cliente y la ganancia para el vendedor.

Proceso Ejercicio18
	Escribir "Ingrese la cantidad de CDs"
	Leer cant_cd
	
	si cant_cd < 10 Entonces
		Total_pagar = cant_cd * 10
	SiNo
		si cant_cd >= 10 y cant_cd < 100
			Total_pagar = cant_cd * 8
		SiNo
			si cant_cd >= 100 y cant_cd < 500
				Total_pagar = cant_cd * 7
			SiNo
				Total_pagar = cant_cd * 6
			FinSi
		FinSi
		
	FinSi
	Ganancia = Total_pagar * 0.0825
	Escribir "El precio total es ", Total_pagar
	Escribir "La ganancia del vendedor es " , Ganancia
	
FinProceso
