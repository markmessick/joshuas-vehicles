function optionChanged() {
    d3.csv("vehicle_scoreboard.csv").then(function(importedData) {
    var dropdownMenu = d3.select("#selDataset");
    
    var selection = dropdownMenu.property("value");

    selectionArr = ['van_1', 'van_2', 'van_3', 'van_4', 'van_5']

    for (var i = 0; i < selectionArr.length; i++) {
        if (selection === selectionArr[i]) {
            var filteredData = importedData.filter(d => d.van === selectionArr[i])
        }
    }
    console.log(filteredData[0])
    
    dates = []
    cabClean = []
    bedClean = []
    oilFill = []
    tire1 = []
    tire2 = []
    tire3 = []
    tire4 = []
    odometer = []
    gasCard = []
    pegBoards = []

    dates2 = []
    cabClean2 = []
    bedClean2 = []
    oilFill2 = []
    tire1B = []
    tire2B = []
    tire3B = []
    tire4B = []
    odometer2 = []
    gasCard2 = []
    pegBoards2 = []

    filteredData.forEach(function(data) {
        data.date = new Date(data.date)
        data.cab_cleanliness_score = +data.cab_cleanliness_score;
        data.bed_cleanliness_score = +data.bed_cleanliness_score;
        data.oil_fill_percent = +data.oil_fill_percent;
        data.tire_1_pressure = +data.tire_1_pressure;
        data.tire_2_pressure = +data.tire_2_pressure;
        data.tire_3_pressure = +data.tire_3_pressure;
        data.tire_4_pressure = +data.tire_4_pressure;
        data.odometer = +data.odometer;


        dates.push(data.date);
        cabClean.push(data.cab_cleanliness_score);
        bedClean.push(data.bed_cleanliness_score);
        oilFill.push(data.oil_fill_percent);
        tire1.push(data.tire_1_pressure);
        tire2.push(data.tire_2_pressure);
        tire3.push(data.tire_3_pressure);
        tire4.push(data.tire_4_pressure);
        odometer.push(data.odometer);
        gasCard.push(data.gas_card);
        pegBoards.push(data.peg_boards);
    });

    var lastCheck = filteredData.slice(-1);

    lastCheck.forEach(function(data) {
        data.date = new Date(data.date);
        data.cab_cleanliness_score = +data.cab_cleanliness_score;
        data.bed_cleanliness_score = +data.bed_cleanliness_score;
        data.oil_fill_percent = +data.oil_fill_percent;
        data.tire_1_pressure = +data.tire_1_pressure;
        data.tire_2_pressure = +data.tire_2_pressure;
        data.tire_3_pressure = +data.tire_3_pressure;
        data.tire_4_pressure = +data.tire_4_pressure;
        data.odometer = +data.odometer;


        dates2.push(data.date);
        cabClean2.push(data.cab_cleanliness_score);
        bedClean2.push(data.bed_cleanliness_score);
        oilFill2.push(data.oil_fill_percent);
        tire1B.push(data.tire_1_pressure);
        tire2B.push(data.tire_2_pressure);
        tire3B.push(data.tire_3_pressure);
        tire4B.push(data.tire_4_pressure);
        odometer2.push(data.odometer);
        gasCard2.push(data.gas_card);
        pegBoards2.push(data.peg_boards);
    });

    function mean(arr) {
        var total = 0;
        for (var i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        meanValue = total / arr.length;
        return meanValue.toFixed(1);
    }

    function count(arr) {
        var counter = 0;
        for (var i =0; i < arr.length; i++) {
            counter += arr[i];
        }
        return counter
    }

    function factChecker(arr) {
        if (arr[0] === 'yes') {
            return "Yes"
        }
        else {
            return "No"
        }
    }

    var target = d3.select("#sample-metadata")
    target.html("")
    target.append("p").html(`Current Odometer Reading: <b>${odometer2[0]}</b>`);
    target.append("p").html(`Cab Cleanliness Rating: <b>${cabClean2[0]}</b>`)
    target.append("p").html(`Bed Cleanliness Rating: <b>${bedClean2}</b>`)
    target.append("p").html(`Has Gas Card?: <b>${factChecker(gasCard2)}</b>`);
    target.append("p").html(`Has Peg Boards?: <b>${factChecker(pegBoards2)}</b>`);
    target.append("p").html(`Oil Status: <b>${oilFill2}% full`);
    // target.append("p").html(`Avg number of Qs per Day: <b>${mean(qCount2)}</b>`);
    // target.append("p").html(`Avg number of Reservices per Day: <b>${mean(rsCount2)}</b>`);
    // target.append("p").html(`Avg number of Starts per Day: <b>${mean(startCount2)}</b>`);
    // target.append("p").html(`Avg amount of Taurus Used per Q: <b>${mean(taurus)} gallons</b>`);
    // target.append("p").html(`Avg amount of Intice used per Q: <b>${mean(intice)}</b>`);
    // target.append("p").html(`Avg amount of Demand G used per Q: <b>${mean(demandG)}</b>`);

    monthArr = [0, 5, 9, 13, 17, 21, 25, 29, 33]
    datesArr = []
    cabCleanArr = []
    bedCleanArr = []
    
    function getDates(data) {
        for (var i = 0; i < monthArr.length; i++) {
            var firstOfMonth = data[monthArr[i]]
            datesArr.push(firstOfMonth.date);
            cabCleanArr.push(firstOfMonth.cab_cleanliness_score);
            bedCleanArr.push(firstOfMonth.bed_cleanliness_score);
        }
    }

    getDates(filteredData)
    
    var traceA1 = {
        x: datesArr,
        y: cabCleanArr,
        name: "Cab Cleanliness",
        type: "line"
    };
    var traceB1 = {
        x: datesArr,
        y: bedCleanArr,
        name: "Bed Cleanliness",
        type: "line"
    };
    // var traceC1 = {
    //     x: datesArr,
    //     y: productivityArr,
    //     name: "Productivity Score",
    //     type: "line"
    // };
    var layout = {
        title: "Van Cleanliness"
    };
    var plot1 = [traceB1, traceA1];
    Plotly.newPlot("plot1", plot1, layout);

    var traceA2 = {
        x: dates,
        y: odometer,
        name: "Odometer Reading",
        type: "line"
    };
    // var traceB2 = {
    //     x: dates2,
    //     y: rsTime2,
    //     name: "Reservices",
    //     type: "line"
    // };
    // var traceC2 = {
    //     x: dates2,
    //     y: startTime2,
    //     name: "Starts",
    //     type: "line"
    // }
    var layout = {
        title: "Mileage Tracker"
    };
    var plot2 = [traceA2];
    Plotly.newPlot("plot2", plot2, layout);

    var trace3 = {
        values: [tire1B[0], tire2B[0], tire3B[0], tire4B[0]],
        labels: ["Tire 1 (PSI)", "Tire 2 (PSI)", "Tire 3 (PSI)", "Tire 4 (PSI)"],
        type: "pie",
        textinfo: "value"
    };
    var layout = {
        title: "Tire Pressure of Each Tire"
    };
    var plot3 = [trace3];
    Plotly.newPlot("plot3", plot3, layout);

    vans = []
    allOdometer = []

    function allVans(data) {
        for (var i = 0; i < selectionArr.length; i++) {
            var tempData = data.filter(d => d.van === selectionArr[i]);
            var lastCheck = tempData.slice(-1);
            vans.push(lastCheck[0].van);
            allOdometer.push(lastCheck[0].odometer);
        }
    }

    allVans(importedData);
    // console.log(vans);
    // console.log(allOdometer);
    
    var traceA4 = {
        x: vans,
        y: allOdometer,
        type: "bar",
    };
    var layout = {
        title: "Van Mileage Comparison"
    };
    var plot4 = [traceA4];
    Plotly.newPlot("plot4", plot4, layout)

    });
}