import $ from "jquery";

export default class SparqlHttp {
    constructor(url, options) {
        this.url = url;
        this.options = {
            format: "json",
            ...options
        };
    }

    query(query) {
        const data = {
            query,
            format: this.options.format
        };
        return new Promise((resolve, reject) => {
            $.ajax(this.url, {
                success: resolve,
                error: reject,
                data
            });
        });
    }
}
