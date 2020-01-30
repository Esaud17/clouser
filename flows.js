
var InitFlow = function () {
    return (function () {
        var steps = [], step = {};

        function add(key, url, request, response, method, nextFlow, PrevFlow) {

            step = {
                action: {
                    url: url,
                    method: method
                },
                schemas: {
                    req: request,
                    res: response
                },
                calls: {
                    next: null,
                    previous: null
                }
            };

            if (steps[key] === undefined) {
                steps[key] = { flow: [] };
            }

            if (nextFlow !== null || nextFlow !== undefined) {
                step.calls["next"] = nextFlow;
            }
            if (PrevFlow !== null || PrevFlow !== undefined) {
                step.calls["previous"] = PrevFlow;
            }
            steps[key].flow.push(step);
        }

        function get(key) {
            return steps[key];
        }
        return { add: add, get: get };
    })();
};

(function Run() {

    var app = InitFlow();

    app.add("FLOW1", "http://www.dominio.com/v1/api/servicioresa", "{}", "{}", "POST", null, null);
    app.add("FLOW1", "http://www.dominio.com/v1/api/servicioresb", "{}", "{}", "POST", 1, null);
    app.add("FLOW1", "http://www.dominio.com/v1/api/servicioresc", "{}", "{}", "POST", 2, 1);

    app.add("FLOW2", "https://www.dominio.com/v1/api/servicioresa", "{}", "{}", "POST", null, null);
    app.add("FLOW2", "https://www.dominio.com/v1/api/servicioresb", "{}", "{}", "POST", 1, null);


    var flow1 = app.get("FLOW1");
    var flow2 = app.get("FLOW2");

    console.log(flow1);
    console.log(flow2);

})();