import React, { useState, useMemo } from 'react';

const ConductoresComponent = () => {
    // Datos de ejemplo para demostrar el componente
    const [data] = useState([
        { cedula: "17386533", conductor: "ACUÑA TRIANA GERMAN", operacion: "TRACTO EXPRESS" },
        { cedula: "86040629", conductor: "AGUDELO SASTOQUE NELSON ANTONIO", operacion: "SERVICIOS VARIOS" },
        { cedula: "19236441", conductor: "AGUIRRE ALVAREZ LUIS EDUARDO", operacion: "CAMION VACIO" },
        { cedula: "91013553", conductor: "ALVAREZ PEÑA JAIRO", operacion: "TRACTO EXPRESS" },
        { cedula: "1071162887", conductor: "ANGULO MEZA RICHARD FERNANDO", operacion: "SERVICIOS VARIOS" },
        { cedula: "93375916", conductor: "ARANGO DELGADO GONZALO", operacion: "TRACTO EXPRESS" },
        { cedula: "7698825", conductor: "ARAUJO PIMENTEL ADALBERTO", operacion: "SURGAS" },
        { cedula: "93450184", conductor: "ARDILA BONILLA LEONARDO", operacion: "MALACATE" },
        { cedula: "86048242", conductor: "ARIAS CANO EDIER", operacion: "TRACTO EXPRESS" },
        { cedula: "18392284", conductor: "ARIAS GARCIA OMAR", operacion: "MALACATE" },
        { cedula: "7697322", conductor: "AYURE ESPINOSA LUIS HERNANDO", operacion: "CAMION VACIO" },
        { cedula: "93372181", conductor: "BEJARANO HEREDIA EDGAR FERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "7706675", conductor: "BERNAL PRADA ARLES", operacion: "SERVICIOS VARIOS" },
        { cedula: "98579966", conductor: "BONILLA  JAIR ALBERTO", operacion: "TRACTO EXPRESS" },
        { cedula: "12124213", conductor: "BONILLA CERQUERA MIGUEL ANTONIO", operacion: "TRACTO EXPRESS" },
        { cedula: "7686453", conductor: "BONILLA RUIZ GILBERTO", operacion: "CAMION VACIO" },
        { cedula: "7332796", conductor: "BUENO  OMAR MARTIN", operacion: "TRACTO EXPRESS" },
        { cedula: "86014459", conductor: "BUITRAGO RIOS DUFRENEHT", operacion: "SERVICIOS VARIOS" },
        { cedula: "93021137", conductor: "CAICEDO CARRILLO YONATHAN ALFONSO", operacion: "MALACATE" },
        { cedula: "12132035", conductor: "CALDERON CUELLAR JORGE EDUARDO", operacion: "CAMION VACIO" },
        { cedula: "91225042", conductor: "CARDENAS REY OSCAR", operacion: "TRACTO EXPRESS" },
        { cedula: "93451826", conductor: "CASTAÑEDA PARRA EDILBER", operacion: "MALACATE" },
        { cedula: "83089988", conductor: "CAVIEDES CORTES MAURICIO", operacion: "SERVICIOS VARIOS" },
        { cedula: "1084923345", conductor: "CERQUERA NARVAEZ EDWIN", operacion: "SERVICIOS VARIOS" },
        { cedula: "9397536", conductor: "CHAPARRO CHAPARRO OLEGARIO", operacion: "TRACTO EXPRESS" },
        { cedula: "79738344", conductor: "CHITIVA BELTRAN NELSON ENRIQUE", operacion: "TRACTO EXPRESS" },
        { cedula: "11339840", conductor: "COLMENARES RODRIGUEZ ALIRIO DINAEL", operacion: "SERVICIOS VARIOS" },
        { cedula: "11232067", conductor: "COPETE CABRA MAURICIO", operacion: "TRACTO EXPRESS" },
        { cedula: "18609978", conductor: "CORREA ACEVEDO YHON FREDY", operacion: "SERVICIOS VARIOS" },
        { cedula: "1049608677", conductor: "CORTES PERALTA MANUEL ANTONIO", operacion: "SERVICIOS VARIOS" },
        { cedula: "72280994", conductor: "CORTES VILLARREAL CARLOS ANDRES", operacion: "SERVICIOS VARIOS" },
        { cedula: "4898724", conductor: "CRUZ GARCIA NOEL", operacion: "CAMION VACIO" },
        { cedula: "7220038", conductor: "CUBIDES RIAÑO HECTOR JULIO", operacion: "SERVICIOS VARIOS" },
        { cedula: "93181748", conductor: "CUELLAR MONTOYA MIGUEL ANGEL", operacion: "MALACATE" },
        { cedula: "12274561", conductor: "CUELLAR MUÑOZ EDGAR", operacion: "MALACATE" },
        { cedula: "6801800", conductor: "DIAZ CANO JHON JANIER", operacion: "SERVICIOS VARIOS" },
        { cedula: "7714767", conductor: "DIAZ HERNANDEZ EDWIN HALEY", operacion: "TRACTO EXPRESS" },
        { cedula: "91266180", conductor: "DUARTE BEIRO WILFRED", operacion: "TRACTO EXPRESS" },
        { cedula: "19225459", conductor: "DUARTE RAMIREZ JORGE MANUEL", operacion: "MALACATE" },
        { cedula: "12265522", conductor: "ESQUIVEL ZAMBRANO WILLIAM", operacion: "SERVICIOS VARIOS" },
        { cedula: "1193029207", conductor: "FLOREZ CONTRERAS HERSON AUGUSTO", operacion: "TRACTO EXPRESS" },
        { cedula: "93294262", conductor: "GALINDO BELTRAN MIGUEL ANTONIO", operacion: "MALACATE" },
        { cedula: "1061626404", conductor: "GALLEGO ARCILA CRISTIAN ALBERTO", operacion: "SERVICIOS VARIOS" },
        { cedula: "1106786938", conductor: "GARCIA DUARTE KEVIN CAMILO", operacion: "MALACATE" },
        { cedula: "1075307844", conductor: "GARCIA LOPEZ ISMAEL", operacion: "TRACTO EXPRESS" },
        { cedula: "3066767", conductor: "GARCIA MELO ARLEY", operacion: "TRACTO EXPRESS" },
        { cedula: "18933789", conductor: "GARCIA TORO NORBERTO", operacion: "TRACTO EXPRESS" },
        { cedula: "1110501837", conductor: "GARZON SUSPE YEISON ANDRES", operacion: "SERVICIOS VARIOS" },
        { cedula: "91156311", conductor: "GOMEZ MARTINEZ ISIDRO", operacion: "TRACTO EXPRESS" },
        { cedula: "7694820", conductor: "GOMEZ ORTIZ HERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "18491953", conductor: "GOMEZ PERDOMO CARLOS HOOVER", operacion: "SERVICIOS VARIOS" },
        { cedula: "77006846", conductor: "GOMEZ REYES HERNAN", operacion: "TRACTO EXPRESS" },
        { cedula: "8508590", conductor: "GOMEZ RUEDA CESAR AUGUSTO", operacion: "SERVICIOS VARIOS" },
        { cedula: "12131205", conductor: "GONGORA PERDOMO SAUL", operacion: "CAMION VACIO" },
        { cedula: "93452330", conductor: "GUTIERREZ  ROSEDEL", operacion: "MALACATE" },
        { cedula: "14010934", conductor: "GUTIERREZ LOZANO EDINSON", operacion: "MALACATE" },
        { cedula: "93451928", conductor: "GUZMAN LAMPREA JOHN FREDY", operacion: "MALACATE" },
        { cedula: "5888397", conductor: "GUZMAN RIOS WILSON", operacion: "MALACATE" },
        { cedula: "12120298", conductor: "HERNANDEZ CABRERA ALVARO", operacion: "SERVICIOS VARIOS" },
        { cedula: "17633679", conductor: "HERNANDEZ PLAZAS JAVIER", operacion: "SURGAS" },
        { cedula: "7706887", conductor: "HERNANDEZ TOVAR CARMELO", operacion: "SURGAS" },
        { cedula: "10167014", conductor: "HURTADO NIÑO FABIO ENRIQUE", operacion: "TRACTO EXPRESS" },
        { cedula: "1075224792", conductor: "JAVELA LARA YILBER", operacion: "CAMION VACIO" },
        { cedula: "7218228", conductor: "JIMENEZ OROZCO LUIS FERNANDO", operacion: "SERVICIOS VARIOS" },
        { cedula: "89000456", conductor: "LOAIZA ANDRADE EDGAR", operacion: "TRACTO EXPRESS" },
        { cedula: "80503738", conductor: "LOAIZA BOBADILLA WILLIAM FERNANDO", operacion: "MALACATE" },
        { cedula: "10110970", conductor: "LOAIZA TABARES SIGIFREDO", operacion: "SERVICIOS VARIOS" },
        { cedula: "86004738", conductor: "LOPEZ LEAL WILSON JANES", operacion: "SERVICIOS VARIOS" },
        { cedula: "93020250", conductor: "LOZANO MENDOZA ANDRES FELIPE", operacion: "MALACATE" },
        { cedula: "93020214", conductor: "LOZANO TAPIERO EUTIQUIO", operacion: "MALACATE" },
        { cedula: "5825798", conductor: "MAHECHA VANEGAS JAIME ENRIQUE", operacion: "MALACATE" },
        { cedula: "1121835372", conductor: "MANGONEZ HERNANDEZ JHONATTAN", operacion: "SERVICIOS VARIOS" },
        { cedula: "80064095", conductor: "MARTINEZ RIAÑO YURY ALEXANDER", operacion: "SERVICIOS VARIOS" },
        { cedula: "12197059", conductor: "MENDEZ PASTRANA JOSE ADAN", operacion: "SURGAS" },
        { cedula: "1106783101", conductor: "MENDOZA SANTOFIMIO JOHAN FERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "7721217", conductor: "MONTANO CORREA JHON DEIMER", operacion: "TRACTO EXPRESS" },
        { cedula: "80741868", conductor: "MONTIEL MENDEZ JORGE ALBEIRO", operacion: "MALACATE" },
        { cedula: "1079172961", conductor: "MORALES VERA ANDRES FELIPE", operacion: "SERVICIOS VARIOS" },
        { cedula: "1129566065", conductor: "MURCIA ARENAS EDUARD ANDRES", operacion: "TRACTO EXPRESS" },
        { cedula: "5993885", conductor: "NAVARRETE ZAMBRANO JOSE FERNANDO", operacion: "SERVICIOS VARIOS" },
        { cedula: "7684744", conductor: "OCHOA DURAN FABIO JAVIER", operacion: "CAMION VACIO" },
        { cedula: "17627616", conductor: "ORDOÑEZ CARVAJAL GERARDO LUIS", operacion: "SERVICIOS VARIOS" },
        { cedula: "86079481", conductor: "OSORIO ARCINIEGAS FERNEY EDUARDO", operacion: "SERVICIOS VARIOS" },
        { cedula: "7710633", conductor: "OSORIO GUEVARA CARLOS ANDRES", operacion: "SERVICIOS VARIOS" },
        { cedula: "79508777", conductor: "OVIEDO OLIVEROS ANCIZAR", operacion: "MALACATE" },
        { cedula: "1033734849", conductor: "PACHECO HEREDIA FRANK EIDISON", operacion: "SERVICIOS VARIOS" },
        { cedula: "10185242", conductor: "PADILLA BUSTOS JORGE ELICIO", operacion: "TRACTO EXPRESS" },
        { cedula: "93453625", conductor: "PALOMINO FLOREZ HUGO", operacion: "MALACATE" },
        { cedula: "7718010", conductor: "PASTRANA HERNANDEZ MIGUEL ANGEL", operacion: "CAMION VACIO" },
        { cedula: "93451876", conductor: "PERALTA ARANGO JUAN CARLOS", operacion: "MALACATE" },
        { cedula: "93448935", conductor: "PERALTA MURCIA JOSE IGNACIO", operacion: "MALACATE" },
        { cedula: "7702879", conductor: "PERDOMO MORA PUSHKIN FEHR", operacion: "SERVICIOS VARIOS" },
        { cedula: "10188464", conductor: "PEREZ  JAVIER ANDRES", operacion: "TRACTO EXPRESS" },
        { cedula: "14279830", conductor: "PEREZ ALGECIRAS FERNEY SAMIR", operacion: "MALACATE" },
        { cedula: "1098684853", conductor: "PEREZ BELTRAN HENRY ALBERTO", operacion: "TRACTO EXPRESS" },
        { cedula: "5853885", conductor: "PEREZ BOLAÑOS ALFONSO", operacion: "MALACATE" },
        { cedula: "14258198", conductor: "PEREZ DEVIA ESTEBAN", operacion: "MALACATE" },
        { cedula: "8722125", conductor: "PERTUZ SALCEDO EMILSO JOSE", operacion: "TRACTO EXPRESS" },
        { cedula: "17633679", conductor: "PLAZAS HERNANDEZ JAVIER", operacion: "SURGAS" },
        { cedula: "91254328", conductor: "PORTILLA ORTEGA LUIS HORACIO", operacion: "TRACTO EXPRESS" },
        { cedula: "14011004", conductor: "PULIDO PULIDO YEIMY YOVANY", operacion: "MALACATE" },
        { cedula: "93450432", conductor: "QUESADA GALEANO JOHN FREDY", operacion: "MALACATE" },
        { cedula: "93448396", conductor: "QUESADA RUIZ LUIS DARVIS", operacion: "MALACATE" },
        { cedula: "79474461", conductor: "QUINTERO  JORGE", operacion: "TRACTO EXPRESS" },
        { cedula: "1106776342", conductor: "QUINTERO MOLINA JEISSON FERNANDO", operacion: "MALACATE" },
        { cedula: "14010863", conductor: "QUIÑONES PRIETO JUAN PABLO", operacion: "MALACATE" },
        { cedula: "14011251", conductor: "QUIÑONES RIAÑO GUSTAVO EDUARDO", operacion: "MALACATE" },
        { cedula: "11447973", conductor: "QUIÑONEZ REINOSO EDUIN YAMID", operacion: "MALACATE" },
        { cedula: "1080183082", conductor: "RAMIREZ  DIEGO OMAR", operacion: "SURGAS" },
        { cedula: "18497551", conductor: "RAMIREZ ARROYAVE HERNAN ALONSO", operacion: "TRACTO EXPRESS" },
        { cedula: "93450817", conductor: "RAMIREZ SANTOFIMIO ALEJANDRO", operacion: "MALACATE" },
        { cedula: "77151507", conductor: "RAMOS BUSTOS OVER", operacion: "TRACTO EXPRESS" },
        { cedula: "12568068", conductor: "RAMOS RODRIGUEZ EUMIDES ENRIQUE", operacion: "SURGAS" },
        { cedula: "1120358757", conductor: "RICO OLIVEROS YIMMY HERNAN", operacion: "SERVICIOS VARIOS" },
        { cedula: "5887909", conductor: "RIVERA PAREJA HALBERT", operacion: "MALACATE" },
        { cedula: "79707936", conductor: "RODRIGUEZ BUITRAGO OSCAR MANUEL", operacion: "TRACTO EXPRESS" },
        { cedula: "17347226", conductor: "RODRIGUEZ RIOS JOSE FERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "5832982", conductor: "RODRIGUEZ SANCHEZ HEBER", operacion: "MALACATE" },
        { cedula: "1106786763", conductor: "ROJAS CUMACO WILDER FABIAN", operacion: "MALACATE" },
        { cedula: "1004493933", conductor: "ROJAS MARTINEZ JORGE ARMANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "93448212", conductor: "ROJAS MARTINEZ WILSON FERNANDO", operacion: "MALACATE" },
        { cedula: "7252817", conductor: "ROJAS MONTOYA WILLIAM ANTONIO", operacion: "TRACTO EXPRESS" },
        { cedula: "12195495", conductor: "ROJAS ROJAS JHON JAIVER", operacion: "SERVICIOS VARIOS" },
        { cedula: "93449374", conductor: "ROJAS SILVA NELSON ALBERTO", operacion: "MALACATE" },
        { cedula: "80138354", conductor: "ROLDAN RODRIGUEZ JUAN CARLOS", operacion: "SERVICIOS VARIOS" },
        { cedula: "11518495", conductor: "ROMERO RODRIGUEZ CESAR AUGUSTO", operacion: "MALACATE" },
        { cedula: "72309262", conductor: "RUIZ CUESTAS OSCAR EDUARDO", operacion: "TRACTO EXPRESS" },
        { cedula: "93448795", conductor: "SABOGAL TIQUE OSCAR ALFONSO", operacion: "MALACATE" },
        { cedula: "83233191", conductor: "SAENZ GONZALEZ JOSE LIDER", operacion: "SERVICIOS VARIOS" },
        { cedula: "79533512", conductor: "SALAS  LIGIO ANGEL MARIA", operacion: "TRACTO EXPRESS" },
        { cedula: "7172007", conductor: "SALAS LOZANO FREDY  WILLIAM", operacion: "SERVICIOS VARIOS" },
        { cedula: "79397232", conductor: "SANABRIA RAMIREZ HECTOR FERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "17337821", conductor: "SANABRIA RIVERA OSCAR CESAR", operacion: "SERVICIOS VARIOS" },
        { cedula: "14236689", conductor: "SANCHEZ  ALVARO", operacion: "TRACTO EXPRESS" },
        { cedula: "12136525", conductor: "SANCHEZ AMAYA CARLOS ALBERTO", operacion: "SERVICIOS VARIOS" },
        { cedula: "83222489", conductor: "SANCHEZ ARTEAGA EDUIN ANDRES", operacion: "TRACTO EXPRESS" },
        { cedula: "93451707", conductor: "SANCHEZ GARCIA PABLO ALEXANDER", operacion: "MALACATE" },
        { cedula: "7701698", conductor: "SANCHEZ MONTANO ROBINSON", operacion: "TRACTO EXPRESS" },
        { cedula: "18184916", conductor: "SANCHEZ MOSQUERA LEY  DEL FARO", operacion: "SERVICIOS VARIOS" },
        { cedula: "1071165154", conductor: "SASTOQUE GUTIERREZ ALDEMAR", operacion: "SERVICIOS VARIOS" },
        { cedula: "79892431", conductor: "SUAREZ DUQUE JOHN JAIRO", operacion: "MALACATE" },
        { cedula: "74795215", conductor: "SUAREZ GUERRERO HUGO ALBERTO", operacion: "SERVICIOS VARIOS" },
        { cedula: "1106786698", conductor: "TORRES CORRECHA JHON EINER", operacion: "MALACATE" },
        { cedula: "79743847", conductor: "VAQUIRO SANCHEZ JOSE GERARDO", operacion: "MALACATE" },
        { cedula: "7702444", conductor: "VARGAS ARDILA FRANKLIN", operacion: "TRACTO EXPRESS" },
        { cedula: "3066635", conductor: "VARGAS HERRERA EDGARD LEONARDO", operacion: "TRACTO EXPRESS" },
        { cedula: "3066752", conductor: "VARGAS HERRERA WILSON FERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "12195232", conductor: "VASQUEZ TRUJILLO DANIEL", operacion: "SURGAS" },
        { cedula: "80734132", conductor: "VEGA CABALLERO FARID", operacion: "SURGAS" },
        { cedula: "5971579", conductor: "VERA ANGARITA WILSON ALBERTO", operacion: "MALACATE" },
        { cedula: "72004312", conductor: "VESGA GALVIS FABIO ENRIQUE", operacion: "TRACTO EXPRESS" },
        { cedula: "86067899", conductor: "VESGA NIETO LUCAS", operacion: "SERVICIOS VARIOS" },
        { cedula: "93083549", conductor: "VIDAL RINCON ROMEL ARTURO", operacion: "SERVICIOS VARIOS" },
        { cedula: "1123563309", conductor: "VILLADA PRIETO DERBIS FABIAN", operacion: "SERVICIOS VARIOS" },
        { cedula: "79463956", conductor: "VILLAIZAN QUINTERO CARLOS ARTURO", operacion: "TRACTO EXPRESS" },
        { cedula: "93021138", conductor: "VILLALBA CARRILLO CARLOS MARIO", operacion: "MALACATE" },
        { cedula: "93131589", conductor: "VILLANUEVA GUZMAN SILVESTRE", operacion: "SURGAS" },
        { cedula: "12136696", conductor: "VILLARREAL GRAFFE JUAN CARLOS", operacion: "TRACTO EXPRESS" },
        { cedula: "93449956", conductor: "ZUÑIGA CABRERA ALEXANDER", operacion: "MALACATE" },
        { cedula: "93449956", conductor: "PERDOMO SOLANO LIBARDO", operacion: "OPERATIVA VARIOS" },
        { cedula: "1023918233", conductor: "RAMIREZ GARZON JUAN DAVID", operacion: "SERVICIOS VARIOS" },
        { cedula: "1121898230", conductor: "DIAZ CASTRILLON ONOFRE ALEXANDER", operacion: "SERVICIOS VARIOS" },
        { cedula: "86084049", conductor: "DUARTE  MURILLO JOSE HELIODORO", operacion: "SERVICIOS VARIOS" },
        { cedula: "79490214", conductor: "TIRADO ARIZA LUIS ALBERTO", operacion: "TRACTO EXPRESS" },
        { cedula: "19378260", conductor: "SASTOQUE HIDALGO JULIO CESAR", operacion: "SERVICIOS VARIOS" },
        { cedula: "7686201", conductor: "VALDERRAMA MURCIA JORGE LUIS", operacion: "SERVICIOS VARIOS" },
        { cedula: "72342095", conductor: "JUAN MANUEL SANTAMARIA GARCIA", operacion: "SERVICIOS VARIOS" },
        { cedula: "79557770", conductor: "JAVIER ARLEXIS RODRIGUEZ GONZALEZ", operacion: "SERVICIOS VARIOS" },
        { cedula: "1105783394 ", conductor: "JEIMAR FRANCISCO VEGA", operacion: "TRACTO EXPRESS" },
        { cedula: "1121886609", conductor: "CAMILO ANDRES CONTRERAS PEREZ", operacion: "TRACTO EXPRESS" },
        { cedula: "1075252673", conductor: "GERMAN ANDRES GUERRERO ZAMBRANO", operacion: "SERVICIOS VARIOS" },
        { cedula: "86067592", conductor: "JAIME ALBERTO JIMENEZ CASAS", operacion: "SERVICIOS VARIOS" },
        { cedula: "96353025", conductor: "DARIO QUINTERO OROZCO", operacion: "TRACTO EXPRESS" },
        { cedula: "17342848", conductor: "HERNANDO ROJAS GAMBOA", operacion: "SERVICIOS VARIOS" },
        { cedula: "17356109", conductor: "ENRIQUE ALFONSO CONDE", operacion: "SERVICIOS VARIOS" },
        { cedula: "1080292538", conductor: "YHON EDINSON VARGAS VARGAS", operacion: "SURGAS" },
        { cedula: "1004360312", conductor: "LUIS EDUARDO MARULANDA OSORIO", operacion: "SERVICIOS VARIOS" },
        { cedula: "70725933", conductor: "JORGE IVAN CARDONA BARBOSA", operacion: "TRACTO EXPRESS" },
        { cedula: "79530640", conductor: "LUIS ALBERTO GRAU RODRIGUEZ", operacion: "SERVICIOS VARIOS" },
        { cedula: "10254748", conductor: "JOSE JESUS OSPINA SALGADO", operacion: "SERVICIOS VARIOS" },
        { cedula: "83234433", conductor: "ROLANDO POLANIA ORTIZ", operacion: "SURGAS" },
        { cedula: "7727359", conductor: "MICHAEL VALENCIA VALENCIA", operacion: "SURGAS" },
        { cedula: "1111111", conductor: "RODRIGO CAMACHO", operacion: "TRACTO EXPRESS" },
        { cedula: "79844101", conductor: "YONNY JERLEY SANCHEZ", operacion: "SERVICIOS VARIOS" },
        { cedula: "11111111", conductor: "JOSE DIOMEDES ARIAS", operacion: "SERVICIOS VARIOS" },
        { cedula: "11111111", conductor: "CARLOS GUTIERREZ", operacion: "TRACTO EXPRESS" },
        { cedula: "72048632", conductor: "MARTINEZ OÑORO LUIS ANIBAL", operacion: "TRACTO EXPRESS" },
        { cedula: "11111111", conductor: "MARCO ORREGO", operacion: "TRACTO EXPRESS" }
    ]);

    const [search, setSearch] = useState({
        cedula: '',
        conductor: '',
        operacion: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearch(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.cedula.toLowerCase().includes(search.cedula.toLowerCase()) &&
            item.conductor.toLowerCase().includes(search.conductor.toLowerCase()) &&
            item.operacion.toLowerCase().includes(search.operacion.toLowerCase())
        );
    }, [data, search]);

    const stats = useMemo(() => {
        const servicio = data.filter(item => item.operacion === 'SERVICIOS VARIOS').length;
        const hocol = data.filter(item => item.operacion === 'MALACATE').length;
        const tracto = data.filter(item => item.operacion === 'TRACTO EXPRESS').length;
        const camionVacio = data.filter(item => item.operacion === 'CAMION VACIO').length;
        const operativaVarios = data.filter(item => item.operacion === 'OPERATIVA VARIOS').length;

        return {
            total: data.length,
            servicio,
            hocol,
            tracto,
            camionVacio,
            operativaVarios
        };
    }, [data]);

    const hasActiveFilters = search.cedula || search.conductor || search.operacion;

    const clearFilters = () => {
        setSearch({
            cedula: '',
            conductor: '',
            operacion: ''
        });
    };

    const getOperationBadgeColor = (operacion) => {
        const colors = {
            'SERVICIOS VARIOS': 'bg-gray-500 text-black',
            'MALACATE': 'bg-blue-500 text-white',
            'TRACTO EXPRESS': 'bg-green-400 text-black',
            'CAMION VACIO': 'bg-green-800 text-white',
            'SURGAS': 'bg-orange-400 text-white',
            'OPERATIVA VARIOS': 'bg-white text-black'
        };
        return colors[operacion] || 'bg-gray-500 text-white';
    };

    return (
        <div style={{ backgroundColor: '#373739' }} className="min-h-screen">
            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2" style={{ color: '#c9b977' }}>Conductores</h2>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold" style={{ color: '#ecdda2' }}>{stats.total}</div>
                        <div className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Total Conductores</div>
                    </div>
                    <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold text-yellow-500">{stats.ecopetrol}</div>
                        <div className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Ecopetrol</div>
                    </div>
                    <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold text-blue-500">{stats.hocol}</div>
                        <div className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Hocol</div>
                    </div>
                    <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold text-green-400">{stats.tracto}</div>
                        <div className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Tracto Express</div>
                    </div>
                    <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold text-green-800">{stats.camionVacio}</div>
                        <div className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Camión Vacío</div>
                    </div>
                </div>

                {/* Search Filters */}
                <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 mb-6 border">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold" style={{ color: '#ecdda2' }}>Filtros de Búsqueda</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm hover:opacity-80 font-medium"
                                style={{ color: '#c9b977' }}
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="cedula"
                            placeholder="Filtrar por cédula"
                            style={{
                                backgroundColor: '#020202',
                                borderColor: '#ecdda2',
                                color: '#ecdda2'
                            }}
                            className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-opacity-50 placeholder-opacity-60"
                            value={search.cedula}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="conductor"
                            placeholder="Filtrar por nombre"
                            style={{
                                backgroundColor: '#020202',
                                borderColor: '#ecdda2',
                                color: '#ecdda2'
                            }}
                            className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-opacity-50 placeholder-opacity-60"
                            value={search.conductor}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="operacion"
                            placeholder="Filtrar por operación"
                            style={{
                                backgroundColor: '#020202',
                                borderColor: '#ecdda2',
                                color: '#ecdda2'
                            }}
                            className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-opacity-50 placeholder-opacity-60"
                            value={search.operacion}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Results Counter */}
                <div className="mb-4">
                    <p style={{ color: '#ecdda2' }}>
                        Mostrando <span className="font-semibold" style={{ color: '#c9b977' }}>{filteredData.length}</span> de {data.length} resultados
                    </p>
                </div>

                {/* Table */}
                <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow overflow-hidden border">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead style={{ backgroundColor: '#020202' }}>
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#c9b977' }}>
                                        Cédula
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#c9b977' }}>
                                        Conductor
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#c9b977' }}>
                                        Operación
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y" style={{ borderColor: '#020202' }}>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr key={index} className="hover:opacity-80 transition-opacity">
                                            <td className="px-8 py-4 text-base font-bold" style={{ color: '#ecdda2' }}>
                                                {item.cedula}
                                            </td>
                                            <td className="px-6 py-4 text-base font-bold" style={{ color: '#ecdda2' }}>
                                                {item.conductor}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${getOperationBadgeColor(item.operacion)}`}>
                                                    {item.operacion}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center">
                                            <div>
                                                <div className="text-lg font-medium mb-2" style={{ color: '#c9b977' }}>No se encontraron resultados</div>
                                                <p className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Intenta modificar los filtros de búsqueda</p>
                                                {hasActiveFilters && (
                                                    <button
                                                        onClick={clearFilters}
                                                        style={{ backgroundColor: '#c9b977' }}
                                                        className="mt-4 px-4 py-2 text-black rounded-lg hover:opacity-90 text-sm font-medium transition-opacity"
                                                    >
                                                        Limpiar filtros
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConductoresComponent;