const WIDTH = 960;
const HEIGHT = 720;

var min_size = 40;
var max_size = 80;
var delta_size = 1;

var xloc = [150, 800, 100, 200, 150, 750, 850, 800, 100, 900, 500];
var yloc = [150, 150, 300, 300, 500, 300, 300, 500, 200, 200, 700];
var big = [true, true, false, false, false, false, false, false, false, false, false];
var sz = [min_size, min_size, min_size, min_size, min_size, min_size, min_size, min_size, min_size, min_size, min_size];
var dx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var dy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var color_id = [0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1];
var txt = ["Montagues", "Capulets", "Lord Montague", "Lady Montague", "Romeo", "Lord Capulet", "Lady Capulet", "Juliet", "Benvolio", "Tybalt", "Paris"];
var graph = [[2, 3, 8], [5, 6, 9], [0, 3, 4], [0, 2, 4], [2, 3, 7, 8], [1 ,6, 7], [1, 5, 7], [5, 6, 4, 9, 10], [0, 4], [1, 7], [7]];
var long_dist = [[4, 7], [7, 4], [4, 8], [8, 4], [0, 8], [8, 0], [1, 9], [9, 1]];
var med_dist = [[4, 8], [8, 4], [7, 9], [9, 7]];
var colors = [[255, 151, 128], [120, 183, 255]];

var wall_buffer = 30;
var wall_force = 10;

var edge_size = 70;

var friction = 0.9;

function collide(id){
    if(dist(mouseX, mouseY, xloc[id], yloc[id]) < sz[id]){
        return true;
    }
    return false;
}

function wall_force_x(id){
    let ret_f = 0;
    let d1 = (xloc[id] - sz[id]); 
    ret_f += Math.max(0, wall_buffer - d1) / wall_force;
    let d2 = (WIDTH - xloc[id] - sz[id]);
    ret_f -= Math.max(0, wall_buffer - d2) / wall_force;
    return ret_f;
}

function wall_force_y(id){
    let ret_f = 0;
    let d1 = (yloc[id] - sz[id]); 
    ret_f += Math.max(0, wall_buffer - d1) / wall_force;
    let d2 = (HEIGHT - yloc[id] - sz[id]);
    ret_f -= Math.max(0, wall_buffer - d2) / wall_force;
    return ret_f;
}

function edge_force(id, id2){
    let len = dist(xloc[id], yloc[id], xloc[id2], yloc[id2]) - sz[id] - sz[id2];
    let xdist = xloc[id2] - xloc[id];
    let ydist = yloc[id2] - yloc[id];
    let minus = edge_size;
    for(let i = 0; i < long_dist.length; i++){
        if(long_dist[i][0] == id && long_dist[i][1] == id2){
            minus = edge_size * 4;
        }
    }
    for(let i = 0; i < med_dist.length; i++){
        if(med_dist[i][0] == id && med_dist[i][1] == id2){
            minus = edge_size * 2;
        }
    }
    let b_force = (len - minus) / 100;
    let mp = b_force / (Math.sqrt(xdist * xdist + ydist * ydist));
    return [xdist * mp, ydist * mp];
}

function setup(){
    createCanvas(WIDTH, HEIGHT);
}

function draw(){
    background(220);

    // Size Manipulation
    for(let i = 0; i < xloc.length; i++){
        let csz = map(sz[i], min_size, max_size, 0, 1);
        if(big[i] || collide(i)){
            let inv = Math.min(0.3, (1/(csz+1)) - 0.5);
            csz += inv;
        }else{
            let inv = Math.min(0.3, (1/(2-csz)) - 0.5);
            csz -= inv;
        }
        sz[i] = map(csz, 0, 1, min_size, max_size, true);
    }

    // Force Calculation
    for(let i = 0; i < xloc.length; i++){
        let f_x = wall_force_x(i);
        let f_y = wall_force_y(i);
        for(let j = 0; j < graph[i].length; j++){
            let c_ar = edge_force(i, graph[i][j]);
            f_x += c_ar[0];
            f_y += c_ar[1];
        }
        dx[i] += f_x;
        dy[i] += f_y;
        dx[i] *= friction;
        dy[i] *= friction;
        xloc[i] += dx[i];
        yloc[i] += dy[i];
    }

    // Display Connections
    for(let i = 0; i < xloc.length; i++){
        for(let j = 0; j < graph[i].length; j++){
            let x = graph[i][j];
            line(xloc[i], yloc[i], xloc[x], yloc[x]);
        }
    }

    // Display Circles
    for(let i = 0; i < xloc.length; i++){
        let c_ar = JSON.parse(JSON.stringify(colors[color_id[i]]));
        if(collide(i)){
            for(let j = 0; j < 3; j++){
                c_ar[j] *= 0.9;
            }
        }
        fill(color(c_ar[0], c_ar[1], c_ar[2]));
        ellipse(xloc[i], yloc[i], sz[i]*2, sz[i]*2);
        fill(0);
        textAlign(CENTER);
        textSize(11);
        if(big[i] || collide(i)){
            textSize(22);
        }
        text(txt[i], xloc[i], yloc[i]);
    }
}
