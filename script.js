let log = console.log;

let arr = [8, 4, 5, 2, 7, 6, 9, 1, 3, 5, 9, 11, 15, 12, 0, 7, 19, 17, 18, 13]; // Mảng ban đầu
//let arr = [4, 5, 0, 1, 0]; // Mảng ban đầu
let arr_begin = arr;
let arrNumber = arr;
let n = arrNumber.length; // Đếm mảng

//log(arrNumber);

let s = d3.select("svg");
let group;
let u = 0;

//Từ mảng vẽ ra Frontend
let drawCol = (arr_begin) => {
    let arrNumber = arr_begin;
    let s = d3.select("svg");
    let group;
    let u = 0;

    //Vẽ underline
    let underline = s.append("path")
        .attr('class', 'underline')
        .attr('d', 'M 215 180 L 215 195 L 75 195 L 75 180')
        .attr('stroke', '#000')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('opacity', 0)
        .attr('ws', 0);

    for (let i = 0; i < n; i++) {
        u = arrNumber[i];

        //Tạo group
        group = s.append("g")
            .attr('class', 'box_number_' + i + '_' + u)
            .attr('ws', 0)
            .attr('transform', 'translate(0, 0)');

        //Thêm 'rect' vào group
        group.append("rect")
            .attr('x', 80 * (i + 1))
            .attr('y', 10 * (9 - u) + 50)
            .attr("width", 50)
            .attr("height", 10 * u + 50)
            .attr('fill', 'rgba(90, 255, 0, 0.' + u + ')');

        //Thêm 'text' vào group
        group.append("text")
            .attr("x", 80 * (i + 1) + 17)
            .attr("y", 175)
            .attr('width', 40)
            .attr('height', 10 * u + 10)
            .text(u)
            .attr('style', 'font-family: tahoma; font-size: 20px')
            .attr('fill', '#000');
    }

    $('.start').unbind('click');
    $('.start').click(function () {
        start(arrNumber);
    });
}

drawCol(arr_begin); // Vẽ ra frontend

let start = (arr_begin) => {
    let arrNumber = arr_begin;
    removeActive();
    $('.start').addClass('active');

    //Click vào button "Start" thì sẽ hiện Underline
    selected_s_underline = s.select('.underline');
    selected_s_underline
        .transition()
        .delay(0)
        .duration(1000)
        .attr('opacity', '1');

    let temp = j = v = a = x1 = x2 = u = cy1 = cy2 = d = c = b = q = p = 0;

    //Vòng lặp sắp xếp mảng và animation
    for (i = 0; i < n; i++) {
        for (j = i - 1; j >= 0; j--) {

            let u = j + 1;

            //Tạo biến 'b' để biết thằng (i) hiện tại so với vòng lặp trước giống hay khác nhau
            if (b === i) {

            } else {
                b = i;

                x3 = i * 80 - 80;
                selected3 = s.select('.underline');
                selected3.attr('ws', x3);
                selected3
                    .transition()
                    .delay(v * 1000 + c + 1000)
                    .duration(1000)
                    .attr('transform', 'translate(' + x3 + ', 0)');

            }

            if (arrNumber[u] < arrNumber[j]) {
                if (d === i) {
                    c += 500;
                    selected3 = s.select('.underline');
                    ws3 = parseFloat(selected3.attr('ws'));
                    x3 = ws3 - 80;
                    selected3.attr('ws', x3);
                    selected3
                        .transition()
                        .delay(v * 1000 + c + 500)
                        .duration(1000)
                        .attr('transform', 'translate(' + x3 + ', 0)');
                } else {
                    c += 2000;
                    d = i;
                }
                v++;

                selected = s.select('.box_number_' + u + '_' + arrNumber[u]);
                ws = parseFloat(selected.attr('ws'));
                x1 = ws - 80;
                selected.attr('ws', x1);
                selected.attr('class', 'box_number_' + j + '_' + arrNumber[u]);
                selected
                    .transition()
                    .delay(v * 1000 + c + 500)
                    .duration(1000)
                    .attr('transform', 'translate(' + x1 + ', 0)');

                selected2 = s.select('.box_number_' + j + '_' + arrNumber[j]);
                ws2 = parseFloat(selected2.attr('ws'));
                x2 = ws2 + 80;

                selected2.attr('ws', x2);
                selected2.attr('class', 'box_number_' + u + '_' + arrNumber[j]);
                selected2
                    .transition()
                    .delay(v * 1000 + c + 500)
                    .duration(1000)
                    .attr('transform', 'translate(' + x2 + ', 0)');

                temp = arrNumber[u];
                arrNumber[u] = arrNumber[j];
                arrNumber[j] = temp;

            } else {
                break;
            }

        }
    }

    //Khi sắp xếp xong thì ẩn underline
    selected3 = s.select('.underline');
    selected3.attr('ws', x3);
    selected3
        .transition()
        .delay(v * 1000 + c + 1000)
        .duration(1000)
        .attr('opacity', '0');
    setTimeout(function () {
        removeActive();
    }, v * 1000 + c + 1000)
}

const stop = () => {
    removeActive();
    let arrs_get = document.getElementsByTagName("text");
    let n = arrs_get.length;
    let text;
    var arrNumber1 = [];
    for (let i = 0; i < n; i++) {
        text = parseFloat(arrs_get[i].innerHTML);
        arrNumber1.push(text);
    }
    $('svg').html('');
    drawCol(arrNumber1);

}

const random = () => {
    removeActive();
    let arrs_get = document.getElementsByTagName("text");
    let n = arrs_get.length;
    let text;
    var arrNumber1 = [];
    for (let i = 0; i < n; i++) {
        text = parseFloat(arrs_get[i].innerHTML);
        arrNumber1.push(text);
    }
    $('svg').html('');
    shuffle(arrNumber1);
    drawCol(arrNumber1);

}

const removeActive = () => {
    $('button').removeClass('active');
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}