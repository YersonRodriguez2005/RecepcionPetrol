import React, { useState, useMemo } from 'react';

const ConductoresComponent = () => {
    // Sample data - replace with your actual data
    const data = [
        { cedula: "17386533", conductor: "ACUÑA TRIANA GERMAN", operacion: "ECOPETROL" },
        { cedula: "86040629", conductor: "AGUDELO SASTOQUE NELSON ANTONIO", operacion: "ECOPETROL" },
        { cedula: "19236441", conductor: "AGUIRRE ALVAREZ LUIS EDUARDO", operacion: "CAMION VACIO" },
        { cedula: "91013553", conductor: "ALVAREZ PEÑA JAIRO", operacion: "TRACTO EXPRESS" },
        { cedula: "1071162887", conductor: "ANGULO MEZA RICHARD FERNANDO", operacion: "ECOPETROL" },
        { cedula: "93375916", conductor: "ARANGO DELGADO GONZALO", operacion: "TRACTO EXPRESS" },
        { cedula: "7698825", conductor: "ARAUJO PIMENTEL ADALBERTO", operacion: "SURGAS" },
        { cedula: "93450184", conductor: "ARDILA BONILLA LEONARDO", operacion: "MALACATE" },
        { cedula: "86048242", conductor: "ARIAS CANO EDIER", operacion: "TRACTO EXPRESS" },
        { cedula: "18392284", conductor: "ARIAS GARCIA OMAR", operacion: "MALACATE" },
        { cedula: "7697322", conductor: "AYURE ESPINOSA LUIS HERNANDO", operacion: "CAMION VACIO" },
        { cedula: "93372181", conductor: "BEJARANO HEREDIA EDGAR FERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "7706675", conductor: "BERNAL PRADA ARLES", operacion: "ECOPETROL" },
        { cedula: "98579966", conductor: "BONILLA  JAIR ALBERTO", operacion: "TRACTO EXPRESS" },
        { cedula: "12124213", conductor: "BONILLA CERQUERA MIGUEL ANTONIO", operacion: "TRACTO EXPRESS" },
        { cedula: "7686453", conductor: "BONILLA RUIZ GILBERTO", operacion: "CAMION VACIO" },
        { cedula: "7332796", conductor: "BUENO  OMAR MARTIN", operacion: "ECOPETROL" },
        { cedula: "86014459", conductor: "BUITRAGO RIOS DUFRENEHT", operacion: "ECOPETROL" },
        { cedula: "93021137", conductor: "CAICEDO CARRILLO YONATHAN ALFONSO", operacion: "MALACATE" },
        { cedula: "12132035", conductor: "CALDERON CUELLAR JORGE EDUARDO", operacion: "CAMION VACIO" },
        { cedula: "91225042", conductor: "CARDENAS REY OSCAR", operacion: "TRACTO EXPRESS" },
        { cedula: "93451826", conductor: "CASTAÑEDA PARRA EDILBER", operacion: "MALACATE" },
        { cedula: "83089988", conductor: "CAVIEDES CORTES MAURICIO", operacion: "ECOPETROL" },
        { cedula: "1084923345", conductor: "CERQUERA NARVAEZ EDWIN", operacion: "ECOPETROL" },
        { cedula: "9397536", conductor: "CHAPARRO CHAPARRO OLEGARIO", operacion: "TRACTO EXPRESS" },
        { cedula: "79738344", conductor: "CHITIVA BELTRAN NELSON ENRIQUE", operacion: "TRACTO EXPRESS" },
        { cedula: "11339840", conductor: "COLMENARES RODRIGUEZ ALIRIO DINAEL", operacion: "ECOPETROL" },
        { cedula: "11232067", conductor: "COPETE CABRA MAURICIO", operacion: "TRACTO EXPRESS" },
        { cedula: "18609978", conductor: "CORREA ACEVEDO YHON FREDY", operacion: "ECOPETROL" },
        { cedula: "1049608677", conductor: "CORTES PERALTA MANUEL ANTONIO", operacion: "ECOPETROL" },
        { cedula: "72280994", conductor: "CORTES VILLARREAL CARLOS ANDRES", operacion: "ECOPETROL" },
        { cedula: "4898724", conductor: "CRUZ GARCIA NOEL", operacion: "CAMION VACIO" },
        { cedula: "7220038", conductor: "CUBIDES RIAÑO HECTOR JULIO", operacion: "ECOPETROL" },
        { cedula: "93181748", conductor: "CUELLAR MONTOYA MIGUEL ANGEL", operacion: "MALACATE" },
        { cedula: "12274561", conductor: "CUELLAR MUÑOZ EDGAR", operacion: "MALACATE" },
        { cedula: "6801800", conductor: "DIAZ CANO JHON JANIER", operacion: "ECOPETROL" },
        { cedula: "7714767", conductor: "DIAZ HERNANDEZ EDWIN HALEY", operacion: "TRACTO EXPRESS" },
        { cedula: "91266180", conductor: "DUARTE BEIRO WILFRED", operacion: "TRACTO EXPRESS" },
        { cedula: "19225459", conductor: "DUARTE RAMIREZ JORGE MANUEL", operacion: "MALACATE" },
        { cedula: "12265522", conductor: "ESQUIVEL ZAMBRANO WILLIAM", operacion: "ECOPETROL" },
        { cedula: "1193029207", conductor: "FLOREZ CONTRERAS HERSON AUGUSTO", operacion: "TRACTO EXPRESS" },
        { cedula: "93294262", conductor: "GALINDO BELTRAN MIGUEL ANTONIO", operacion: "MALACATE" },
        { cedula: "1061626404", conductor: "GALLEGO ARCILA CRISTIAN ALBERTO", operacion: "ECOPETROL" },
        { cedula: "1106786938", conductor: "GARCIA DUARTE KEVIN CAMILO", operacion: "MALACATE" },
        { cedula: "1075307844", conductor: "GARCIA LOPEZ ISMAEL", operacion: "TRACTO EXPRESS" },
        { cedula: "3066767", conductor: "GARCIA MELO ARLEY", operacion: "TRACTO EXPRESS" },
        { cedula: "18933789", conductor: "GARCIA TORO NORBERTO", operacion: "TRACTO EXPRESS" },
        { cedula: "1110501837", conductor: "GARZON SUSPE YEISON ANDRES", operacion: "ECOPETROL" },
        { cedula: "91156311", conductor: "GOMEZ MARTINEZ ISIDRO", operacion: "TRACTO EXPRESS" },
        { cedula: "7694820", conductor: "GOMEZ ORTIZ HERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "18491953", conductor: "GOMEZ PERDOMO CARLOS HOOVER", operacion: "ECOPETROL" },
        { cedula: "77006846", conductor: "GOMEZ REYES HERNAN", operacion: "TRACTO EXPRESS" },
        { cedula: "8508590", conductor: "GOMEZ RUEDA CESAR AUGUSTO", operacion: "ECOPETROL" },
        { cedula: "12131205", conductor: "GONGORA PERDOMO SAUL", operacion: "CAMION VACIO" },
        { cedula: "93452330", conductor: "GUTIERREZ  ROSEDEL", operacion: "MALACATE" },
        { cedula: "14010934", conductor: "GUTIERREZ LOZANO EDINSON", operacion: "MALACATE" },
        { cedula: "93451928", conductor: "GUZMAN LAMPREA JOHN FREDY", operacion: "MALACATE" },
        { cedula: "5888397", conductor: "GUZMAN RIOS WILSON", operacion: "MALACATE" },
        { cedula: "12120298", conductor: "HERNANDEZ CABRERA ALVARO", operacion: "ECOPETROL" },
        { cedula: "17633679", conductor: "HERNANDEZ PLAZAS JAVIER", operacion: "SURGAS" },
        { cedula: "7706887", conductor: "HERNANDEZ TOVAR CARMELO", operacion: "SURGAS" },
        { cedula: "10167014", conductor: "HURTADO NIÑO FABIO ENRIQUE", operacion: "TRACTO EXPRESS" },
        { cedula: "1075224792", conductor: "JAVELA LARA YILBER", operacion: "CAMION VACIO" },
        { cedula: "7218228", conductor: "JIMENEZ OROZCO LUIS FERNANDO", operacion: "MALACATE" },
        { cedula: "89000456", conductor: "LOAIZA ANDRADE EDGAR", operacion: "TRACTO EXPRESS" },
        { cedula: "80503738", conductor: "LOAIZA BOBADILLA WILLIAM FERNANDO", operacion: "MALACATE" },
        { cedula: "10110970", conductor: "LOAIZA TABARES SIGIFREDO", operacion: "ECOPETROL" },
        { cedula: "86004738", conductor: "LOPEZ LEAL WILSON JANES", operacion: "ECOPETROL" },
        { cedula: "93020250", conductor: "LOZANO MENDOZA ANDRES FELIPE", operacion: "MALACATE" },
        { cedula: "93020214", conductor: "LOZANO TAPIERO EUTIQUIO", operacion: "MALACATE" },
        { cedula: "5825798", conductor: "MAHECHA VANEGAS JAIME ENRIQUE", operacion: "MALACATE" },
        { cedula: "1121835372", conductor: "MANGONEZ HERNANDEZ JHONATTAN", operacion: "ECOPETROL" },
        { cedula: "80064095", conductor: "MARTINEZ RIAÑO YURY ALEXANDER", operacion: "ECOPETROL" },
        { cedula: "12197059", conductor: "MENDEZ PASTRANA JOSE ADAN", operacion: "SURGAS" },
        { cedula: "1106783101", conductor: "MENDOZA SANTOFIMIO JOHAN FERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "7721217", conductor: "MONTANO CORREA JHON DEIMER", operacion: "TRACTO EXPRESS" },
        { cedula: "80741868", conductor: "MONTIEL MENDEZ JORGE ALBEIRO", operacion: "MALACATE" },
        { cedula: "1079172961", conductor: "MORALES VERA ANDRES FELIPE", operacion: "ECOPETROL" },
        { cedula: "1129566065", conductor: "MURCIA ARENAS EDUARD ANDRES", operacion: "TRACTO EXPRESS" },
        { cedula: "5993885", conductor: "NAVARRETE ZAMBRANO JOSE FERNANDO", operacion: "ECOPETROL" },
        { cedula: "7684744", conductor: "OCHOA DURAN FABIO JAVIER", operacion: "CAMION VACIO" },
        { cedula: "17627616", conductor: "ORDOÑEZ CARVAJAL GERARDO LUIS", operacion: "ECOPETROL" },
        { cedula: "86079481", conductor: "OSORIO ARCINIEGAS FERNEY EDUARDO", operacion: "ECOPETROL" },
        { cedula: "7710633", conductor: "OSORIO GUEVARA CARLOS ANDRES", operacion: "ECOPETROL" },
        { cedula: "79508777", conductor: "OVIEDO OLIVEROS ANCIZAR", operacion: "MALACATE" },
        { cedula: "1033734849", conductor: "PACHECO HEREDIA FRANK EIDISON", operacion: "ECOPETROL" },
        { cedula: "10185242", conductor: "PADILLA BUSTOS JORGE ELICIO", operacion: "TRACTO EXPRESS" },
        { cedula: "93453625", conductor: "PALOMINO FLOREZ HUGO", operacion: "MALACATE" },
        { cedula: "7718010", conductor: "PASTRANA HERNANDEZ MIGUEL ANGEL", operacion: "CAMION VACIO" },
        { cedula: "93451876", conductor: "PERALTA ARANGO JUAN CARLOS", operacion: "MALACATE" },
        { cedula: "93448935", conductor: "PERALTA MURCIA JOSE IGNACIO", operacion: "MALACATE" },
        { cedula: "7702879", conductor: "PERDOMO MORA PUSHKIN FEHR", operacion: "ECOPETROL" },
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
        { cedula: "1120358757", conductor: "RICO OLIVEROS YIMMY HERNAN", operacion: "ECOPETROL" },
        { cedula: "5887909", conductor: "RIVERA PAREJA HALBERT", operacion: "MALACATE" },
        { cedula: "79707936", conductor: "RODRIGUEZ BUITRAGO OSCAR MANUEL", operacion: "ECOPETROL" },
        { cedula: "17347226", conductor: "RODRIGUEZ RIOS JOSE FERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "5832982", conductor: "RODRIGUEZ SANCHEZ HEBER", operacion: "MALACATE" },
        { cedula: "1106786763", conductor: "ROJAS CUMACO WILDER FABIAN", operacion: "MALACATE" },
        { cedula: "1004493933", conductor: "ROJAS MARTINEZ JORGE ARMANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "93448212", conductor: "ROJAS MARTINEZ WILSON FERNANDO", operacion: "MALACATE" },
        { cedula: "7252817", conductor: "ROJAS MONTOYA WILLIAM ANTONIO", operacion: "TRACTO EXPRESS" },
        { cedula: "12195495", conductor: "ROJAS ROJAS JHON JAIVER", operacion: "ECOPETROL" },
        { cedula: "93449374", conductor: "ROJAS SILVA NELSON ALBERTO", operacion: "MALACATE" },
        { cedula: "80138354", conductor: "ROLDAN RODRIGUEZ JUAN CARLOS", operacion: "ECOPETROL" },
        { cedula: "11518495", conductor: "ROMERO RODRIGUEZ CESAR AUGUSTO", operacion: "MALACATE" },
        { cedula: "72309262", conductor: "RUIZ CUESTAS OSCAR EDUARDO", operacion: "TRACTO EXPRESS" },
        { cedula: "93448795", conductor: "SABOGAL TIQUE OSCAR ALFONSO", operacion: "MALACATE" },
        { cedula: "83233191", conductor: "SAENZ GONZALEZ JOSE LIDER", operacion: "ECOPETROL" },
        { cedula: "79533512", conductor: "SALAS  LIGIO ANGEL MARIA", operacion: "TRACTO EXPRESS" },
        { cedula: "7172007", conductor: "SALAS LOZANO FREDY  WILLIAM", operacion: "ECOPETROL" },
        { cedula: "79397232", conductor: "SANABRIA RAMIREZ HECTOR FERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "17337821", conductor: "SANABRIA RIVERA OSCAR CESAR", operacion: "ECOPETROL" },
        { cedula: "14236689", conductor: "SANCHEZ  ALVARO", operacion: "TRACTO EXPRESS" },
        { cedula: "12136525", conductor: "SANCHEZ AMAYA CARLOS ALBERTO", operacion: "ECOPETROL" },
        { cedula: "83222489", conductor: "SANCHEZ ARTEAGA EDUIN ANDRES", operacion: "ECOPETROL" },
        { cedula: "93451707", conductor: "SANCHEZ GARCIA PABLO ALEXANDER", operacion: "MALACATE" },
        { cedula: "7701698", conductor: "SANCHEZ MONTANO ROBINSON", operacion: "TRACTO EXPRESS" },
        { cedula: "18184916", conductor: "SANCHEZ MOSQUERA LEY  DEL FARO", operacion: "ECOPETROL" },
        { cedula: "1071165154", conductor: "SASTOQUE GUTIERREZ ALDEMAR", operacion: "ECOPETROL" },
        { cedula: "79892431", conductor: "SUAREZ DUQUE JOHN JAIRO", operacion: "MALACATE" },
        { cedula: "74795215", conductor: "SUAREZ GUERRERO HUGO ALBERTO", operacion: "MALACATE" },
        { cedula: "1106786698", conductor: "TORRES CORRECHA JHON EINER", operacion: "MALACATE" },
        { cedula: "79743847", conductor: "VAQUIRO SANCHEZ JOSE GERARDO", operacion: "MALACATE" },
        { cedula: "7702444", conductor: "VARGAS ARDILA FRANKLIN", operacion: "TRACTO EXPRESS" },
        { cedula: "3066635", conductor: "VARGAS HERRERA EDGARD LEONARDO", operacion: "TRACTO EXPRESS" },
        { cedula: "3066752", conductor: "VARGAS HERRERA WILSON FERNANDO", operacion: "TRACTO EXPRESS" },
        { cedula: "12195232", conductor: "VASQUEZ TRUJILLO DANIEL", operacion: "SURGAS" },
        { cedula: "80734132", conductor: "VEGA CABALLERO FARID", operacion: "SURGAS" },
        { cedula: "5971579", conductor: "VERA ANGARITA WILSON ALBERTO", operacion: "MALACATE" },
        { cedula: "72004312", conductor: "VESGA GALVIS FABIO ENRIQUE", operacion: "TRACTO EXPRESS" },
        { cedula: "86067899", conductor: "VESGA NIETO LUCAS", operacion: "ECOPETROL" },
        { cedula: "93083549", conductor: "VIDAL RINCON ROMEL ARTURO", operacion: "ECOPETROL" },
        { cedula: "1123563309", conductor: "VILLADA PRIETO DERBIS FABIAN", operacion: "ECOPETROL" },
        { cedula: "79463956", conductor: "VILLAIZAN QUINTERO CARLOS ARTURO", operacion: "TRACTO EXPRESS" },
        { cedula: "93021138", conductor: "VILLALBA CARRILLO CARLOS MARIO", operacion: "MALACATE" },
        { cedula: "93131589", conductor: "VILLANUEVA GUZMAN SILVESTRE", operacion: "SURGAS" },
        { cedula: "12136696", conductor: "VILLARREAL GRAFFE JUAN CARLOS", operacion: "TRACTO EXPRESS" },
        { cedula: "93449956", conductor: "ZUÑIGA CABRERA ALEXANDER", operacion: "MALACATE" },
        { cedula: "93449956", conductor: "LUIS TIRADO", operacion: "TRACTO" },
        { cedula: "93449956", conductor: "LIBARDO PERDOMO", operacion: "OPERATIVA VARIOS" }

    ];

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

    const clearFilters = () => {
        setSearch({
            cedula: '',
            conductor: '',
            operacion: ''
        });
    };

    const filteredData = useMemo(() => {
        return data.filter(item => {
            return item.cedula.toLowerCase().includes(search.cedula.toLowerCase()) &&
                item.conductor.toLowerCase().includes(search.conductor.toLowerCase()) &&
                item.operacion.toLowerCase().includes(search.operacion.toLowerCase());
        });
    }, [search]);

    // Calculate stats
    const stats = useMemo(() => {
        const total = data.length;
        const ecopetrol = data.filter(item => item.operacion === 'ECOPETROL').length;
        const tracto = data.filter(item => item.operacion === 'TRACTO EXPRESS').length;
        const malacate = data.filter(item => item.operacion === 'MALACATE').length;

        return { total, ecopetrol, tracto, malacate };
    }, []);

    const getOperationBadgeColor = (operacion) => {
        switch (operacion) {
            case 'ECOPETROL':
                return 'bg-yellow-500 text-gray-700';
            case 'TRACTO EXPRESS':
                return 'bg-green-500 text-black';
            case 'MALACATE':
                return 'bg-blue-500 text-white';
            case 'SURGAS':
                return 'bg-orange-500 text-white';
            case 'CAMION VACIO':
                return 'bg-green-800 text-white';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const hasActiveFilters = search.cedula || search.conductor || search.operacion;

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Conductores</h2>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                        <div className="text-2xl font-bold text-white">{stats.total}</div>
                        <div className="text-sm text-gray-300">Total Conductores</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                        <div className="text-2xl font-bold text-yellow-400">{stats.ecopetrol}</div>
                        <div className="text-sm text-gray-300">Ecopetrol</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                        <div className="text-2xl font-bold text-green-400">{stats.tracto}</div>
                        <div className="text-sm text-gray-300">Tracto Express</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                        <div className="text-2xl font-bold text-blue-400">{stats.malacate}</div>
                        <div className="text-sm text-gray-300">Malacate</div>
                    </div>
                </div>

                {/* Search Filters */}
                <div className="bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">Filtros de Búsqueda</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-red-400 hover:text-red-300 font-medium"
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
                            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={search.cedula}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="conductor"
                            placeholder="Filtrar por nombre"
                            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={search.conductor}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="operacion"
                            placeholder="Filtrar por operación"
                            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={search.operacion}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Results Counter */}
                <div className="mb-4">
                    <p className="text-gray-300">
                        Mostrando <span className="font-semibold text-blue-400">{filteredData.length}</span> de {data.length} resultados
                    </p>
                </div>

                {/* Table */}
                <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                        Cédula
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                        Conductor
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                        Operación
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-700">
                                            <td className="px-8 py-4 text-base font-bold text-white">
                                                {item.cedula}
                                            </td>
                                            <td className="px-6 py-4 text-base font-bold text-gray-200">
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
                                            <div className="text-gray-400">
                                                <div className="text-lg font-medium mb-2 text-white">No se encontraron resultados</div>
                                                <p className="text-sm">Intenta modificar los filtros de búsqueda</p>
                                                {hasActiveFilters && (
                                                    <button
                                                        onClick={clearFilters}
                                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
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