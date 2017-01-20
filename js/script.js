function SumarDias(fecha, dias) {
    var res = new Date(fecha);
    res.setDate(res.getDate() + dias);
    return res;
}

function FechaActual()
{
    var hoy = new Date();
    var mes = hoy.getMonth()+1;
    if (mes < 10){mes="0"+mes;}
    var dia = hoy.getDate();
    if (dia < 10){dia="0"+dia;}
    if (Modernizr.inputtypes.date){document.f1.fecha2.value = hoy.getFullYear()+"-"+mes+"-"+dia;} //YYYY-MM-DD 
    else{document.f1.fecha2.value = dia+"/"+mes+"/"+hoy.getFullYear();} //DD/MM/YYYY
}

function TragateLaPutaFecha(fch)
{
    if (Modernizr.inputtypes.date){return fch;} //Función hack para Firefox, a Chrome le hace pupa
    else{
        var arrayfecha = fch.split("/"); 
        var fechaguena = new Date();
        fechaguena.setDate(arrayfecha[0]);
        fechaguena.setMonth(arrayfecha[1]-1);
        fechaguena.setFullYear(arrayfecha[2]);
        return fechaguena;
    }
}

function ConvertirFecha(fch)
{
    var fch = new Date(fch);
    var fch_ano = fch.getFullYear();
    var fch_mes = fch.getMonth() + 1;
    var fch_dia = fch.getDate();
    var cadenita = fch_ano + "-" + fch_mes + "-" + fch_dia;
    //var cadenita = fch_dia + "/" + fch_mes + "/" + fch_ano;
    return cadenita;
}

Date.prototype.ConvertirDDMMYYYY = function()
{
    var fch = new Date(this);
    var fch_ano = this.getFullYear();
    var fch_mes = this.getMonth() + 1;
    if (fch_mes<10){fch_mes="0"+fch_mes;}
    var fch_dia = this.getDate();
    if (fch_dia<10){fch_dia="0"+fch_dia;}
    var cadenita = fch_dia + "/" + fch_mes + "/" + fch_ano;
    return cadenita;
}

function RestarSemanas()
{
    var fch2 = new Date(TragateLaPutaFecha(document.f1.fecha2.value));
    
    if(document.f1.opcion.value == "fur"){
        var fch1 = new Date(TragateLaPutaFecha(document.f1.fecha1.value));
    }
    if(document.f1.opcion.value == "ftf"){
        var ftf = new Date(TragateLaPutaFecha(document.f1.fecha1.value));
        var fch1 = new Date(SumarDias(ftf,-14));
    }
    if(document.f1.opcion.value == "fpp"){
        var fpp = new Date(TragateLaPutaFecha(document.f1.fecha1.value));
        var fch1 = new Date(SumarDias(fpp, -280));
    }
    
    var semanas = (fch2 - fch1)/(24*60*60*7*1000);
    var dias = Math.round((semanas - Math.trunc(semanas))*7);
    semanas = Math.trunc(semanas);
    var resultadoresta = [semanas, dias];
    return resultadoresta;
}

function ConstruirCalendario()
{
    if (document.f1.fecha1.value=="" || document.f1.fecha2.value=="")
        {
            alert("Introduzca una fecha válida");
            return 0;
        }
    document.getElementById("textoprenas").innerHTML = "";
    var eventos = {};
    var rojitos = {};

    if(document.f1.opcion.value == "fur"){
        var fur = new Date(TragateLaPutaFecha(document.f1.fecha1.value));
    }
    if(document.f1.opcion.value == "ftf"){
        var ftf = new Date(TragateLaPutaFecha(document.f1.fecha1.value));
        var fur = new Date(SumarDias(ftf,-14));
    }
    if(document.f1.opcion.value == "fpp"){
        var fpp = new Date(TragateLaPutaFecha(document.f1.fecha1.value));
        var fur = new Date(SumarDias(fpp, -280));
    }
    var hoy = new Date(TragateLaPutaFecha(document.f1.fecha2.value));

    var anal1 = new Date(SumarDias(fur, 70));
    var eco1 = new Date(SumarDias(fur, 84));
    var eco2 = new Date(SumarDias(fur, 133));
    var anal2 = new Date(SumarDias(fur, 182));
    var gamma = new Date(SumarDias(fur, 196));
    var tosfe = new Date(SumarDias(fur, 203));
    var eco3 = new Date(SumarDias(fur, 238));
    var anal3 = new Date(SumarDias(fur, 245));
    var monit = new Date(SumarDias(fur, 273));
    var fpp = new Date(SumarDias(fur, 280));
    rojitos[ConvertirFecha(hoy)] = "Hoy/Fecha a calcular"
    rojitos[ConvertirFecha(fur)] = "Fecha de última regla";
    for(i=0;i<7;i++){eventos[ConvertirFecha(SumarDias(anal1,i))] = "Primera analítica";}
    for(i=0;i<11;i++){eventos[ConvertirFecha(SumarDias(eco1,i))] = "Primera ecografía";}
    for(i=0;i<7;i++){eventos[ConvertirFecha(SumarDias(eco2,i))] = "Segunda ecografía";}
    for(i=0;i<7;i++){eventos[ConvertirFecha(SumarDias(anal2,i))] = "Segunda analítica";}
    for(i=0;i<7;i++){eventos[ConvertirFecha(SumarDias(gamma,i))] = "Gamma-Globulina antiD si RH- y vacuna de la tosferina";}
    for(i=0;i<21;i++){eventos[ConvertirFecha(SumarDias(tosfe,i))] = "Vacuna de la tosferina";}
    for(i=0;i<7;i++){eventos[ConvertirFecha(SumarDias(eco3,i))] = "Tercera ecografía";}
    for(i=0;i<7;i++){eventos[ConvertirFecha(SumarDias(anal3,i))] = "Última analítica";}
    for(i=0;i<7;i++){eventos[ConvertirFecha(SumarDias(monit,i))] = "Monitorización";}
    rojitos[ConvertirFecha(fpp)] = "Fecha probable de parto";
    
    $("#calendario").datepicker("destroy");
    
    DibujarCalendario(eventos, rojitos, fur);
    
    var arrayresta = RestarSemanas();
    if (arrayresta[1] == 1)
        {
           document.getElementById("textoprenas").innerHTML += "<br><p><b><span>"+hoy.ConvertirDDMMYYYY()+"</span> - La paciente está embarazada de " + arrayresta[0] + " semanas y 1 día</b></p>"; 
        }
    else
        {
           document.getElementById("textoprenas").innerHTML += "<br><p><b><span>"+hoy.ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> La paciente está embarazada de " + arrayresta[0] + " semanas y " + arrayresta[1] + " días</b></p>"; 
        }
    if (document.f1.opcion.value == "ftf"){
        document.getElementById("textoprenas").innerHTML += "<p<span>>"+ftf.ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Fecha de transferencia</p>";
    }
    else{
        document.getElementById("textoprenas").innerHTML += "<p><span>"+fur.ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Fecha de última regla</p>";  
    }
    document.getElementById("textoprenas").innerHTML += "<p><span>"+anal1.ConvertirDDMMYYYY()+" - "+SumarDias(anal1,6).ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Primera analítica</p>";
    document.getElementById("textoprenas").innerHTML += "<p><span>"+anal1.ConvertirDDMMYYYY()+" - "+SumarDias(anal1,6).ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Primera analítica</p>";
    document.getElementById("textoprenas").innerHTML += "<p><span>"+eco1.ConvertirDDMMYYYY()+" - "+SumarDias(eco1,10).ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Primera ecografía</p>";
    document.getElementById("textoprenas").innerHTML += "<p><span>"+eco2.ConvertirDDMMYYYY()+" - "+SumarDias(eco2,6).ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Segunda ecografía</p>";
    document.getElementById("textoprenas").innerHTML += "<p><span>"+anal2.ConvertirDDMMYYYY()+" - "+SumarDias(anal2,6).ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Segunda analítica</p>";
    document.getElementById("textoprenas").innerHTML += "<p><span>"+gamma.ConvertirDDMMYYYY()+" - "+SumarDias(gamma,6).ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Gamma-Globulina antiD si RH-</p>";
    document.getElementById("textoprenas").innerHTML += "<p><span>"+SumarDias(tosfe,-6).ConvertirDDMMYYYY()+" - "+SumarDias(tosfe,20).ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Vacuna de la tosferina</p>";
    document.getElementById("textoprenas").innerHTML += "<p><span>"+eco3.ConvertirDDMMYYYY()+" - "+SumarDias(eco3,6).ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Tercera ecografía</p>";
    document.getElementById("textoprenas").innerHTML += "<p><span>"+anal3.ConvertirDDMMYYYY()+" - "+SumarDias(anal3,6).ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Última analítica</p>";
    document.getElementById("textoprenas").innerHTML += "<p><span>"+monit.ConvertirDDMMYYYY()+" - "+SumarDias(monit,6).ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Monitorización</p>";
    document.getElementById("textoprenas").innerHTML += "<p><b>"+fpp.ConvertirDDMMYYYY()+" </span><i class='fa fa-long-arrow-right' aria-hidden='true'></i> Fecha probable de parto</b></p>";
    
}

function DibujarCalendario(eventos, rojitos,fur)
{
    if ($(".result").css("display") == "none")
        {
            $(".result").slideToggle();
        }
    else
        {
            $(".result").slideToggle();
            $(".result").slideToggle();
        }
    $("#calendario").datepicker({
		numberOfMonths: [ 4, 3 ],
		dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
		monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		nextText: "Siguiente",
		prevText: "Anterior",
		dateFormat: 'dd/mm/yy',
        defaultDate: fur,
		beforeShowDay: function(date) 
		{
			var search = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
			if (search in eventos) {
				return [true, 'highlight', (eventos[search] || '')];
			}
            if (search in rojitos) {
				return [true, 'rojitos', (rojitos[search] || '')];
			}

		  return [false, '', ''];
		}
	});

}

$(document).ready(function(){ 
    if (Modernizr.inputtypes.date) {/* type date funciona, nada que hacer aqui */} 
    else {	
			/* type date no funciona, usar jQuery UI */
			$('input[type="date"]').datepicker({
				dateFormat: 'dd/mm/yy'
			});
            
        };
	

    FechaActual(); 
    
});

