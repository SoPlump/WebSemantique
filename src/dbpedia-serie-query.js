import {sparql} from "./main";

export const getSerieByName = (name) => {
    return sparql.query(`
        SELECT ?serie, ?label, ?abstract, ?firstReleaseDate, ?genre, ?genreLabel, ?publisher
        WHERE  {
        ?serie rdfs:label ?label;
        dbo:abstract ?abstract;
        dbp:firstReleaseDate ?firstReleaseDate.
        FILTER (?serie = dbr:${name})
        FILTER (lang(?label) = 'en')
        FILTER (lang(?abstract) = 'en')
        }
    `)
        .then(res => {

            const serie = res.results.bindings[0];
            const cutUri = serie.serie.value.split('/');
            return new Promise(resolve => resolve({
                abstract: serie.abstract.value,
                label: serie.label.value,
                firstReleaseDate: serie.firstReleaseDate.value,
                serie: cutUri[cutUri.length - 1]
            }));
            //return new Promise(resolve => resolve(res));
        })
        .then(serie => {
            return sparql
                .query(`
                    SELECT ?game, ?gameName
                    WHERE {
                    ?game dbo:series dbr:${serie.serie};
                    rdfs:label ?gameName.
                    FILTER (lang(?gameName) = 'en')
                    }
                    LIMIT 10
                `)
                .then(res => {

                    const games = res.results.bindings;
                    let usableGames = [];
                    games.forEach(game => {
                        usableGames.push({
                            gameName: game.gameName.value,
                            game: game.game.value
                        })
                    });
                    return new Promise(resolve => resolve({
                        ...serie,
                        games: usableGames
                    }));
                })
        })
        .then(serie => {
            return sparql
                .query(`
                SELECT ?genre, ?genreName
                WHERE {
                dbr:${serie.serie} dbp:genre ?genre.
                ?genre rdfs:label ?genreName.
                FILTER (lang(?genreName) = 'en')
                }
                `)
                .then(res => {

                    const genres = res.results.bindings;
                    let usableGenres = [];
                    genres.forEach(genre => {
                        usableGenres.push({
                            genreName: genre.genreName.value,
                            genre: genre.genre.value
                        })
                    });
                    return new Promise(resolve => resolve({
                        ...serie,
                        genres: usableGenres
                    }));
                })
        })
        .then(serie => {
            return sparql
                .query(`
                    SELECT ?developer, ?developerName
                    WHERE {
                    dbr:${serie.serie} dbp:developer ?developer.
                    ?developer rdfs:label ?developerName
                    FILTER (lang(?developerName) = 'en')
                    }
                `)
                .then(res => {

                    const developers = res.results.bindings;
                    let usableDevelopers = [];
                    developers.forEach(developer => {
                        usableDevelopers.push({
                            developer:developer.developer.value,
                            developerName:developer.developerName.value
                        })
                    });
                    return new Promise(resolve => resolve({
                        ...serie,
                        developers: usableDevelopers
                    }));
                })
        })
        .catch(error => {
            /*eslint-disable no-console*/
            console.log(error)
        })
};

export const getAllSeriesByName = (name) => {
    return sparql.query(`
        select distinct ?uri ?name ?abstract
        WHERE {
            ?game a dbo:VideoGame;
            dbo:series ?uri.
            ?uri rdfs:label ?name.
            FILTER(LangMatches(lang(?name), "en"))
            FILTER contains(lcase(?name), lcase("${name}"))
        }
        `)
        .then(res => {
            let series = res.results.bindings;
            return new Promise(resolve => {
                series = series.map(serie => {
                    return {
                        name: serie.name.value,
                        uri: serie.uri.value
                    };
                });
                resolve(series);
            });
        })
        .catch(error => {
            /*eslint-disable no-console*/
            console.error(error);
        });
};

