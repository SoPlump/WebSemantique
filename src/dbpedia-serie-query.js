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
                    SELECT ?publisher
                    WHERE {
                    dbr:${serie.serie} dbp:publisher ?publisher.
                    }
                `)
                .then(res => {

                    const publishers = res.results.bindings;
                    let usablePublishers = [];
                    publishers.forEach(publisher => {
                        usablePublishers.push({
                            publisher:publisher.publisher.value
                        })
                    });
                    return new Promise(resolve => resolve({
                        ...serie,
                        publishers: usablePublishers
                    }));
                })
        })
        .catch(error => {
            /*eslint-disable no-console*/
            console.log(error)
        })
};


