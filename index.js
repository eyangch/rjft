var info =
    [
        "<strong>Montagues</strong></br>The Montague family is one of the two feuding families in Verona. The Montague family consists of Lord Montague, Lady Montague, Romeo, and other relatives.",

        "<strong>Capulets</strong></br>The Capulet family is one of the two feuding families in Verona. The Capulet family consists of Lord Capulet, Lady Capulet, Juliet, and other relatives.",

        "<strong>Lord Montague</strong></br>Lord Montague is the head of the Montague family and the father of Romeo. Like Lord Capulet, he violently despises the opposing faimly, as he tries to fight \"[t]hou villan Capulet\" with his sword, with only his wife holding him back (I.i.81).",

        "<strong>Lady Montague</strong></br>Lady Montague is the wife of Lord Montague and the mother of Juliet. Like Lady Capulet, she is more peaceful than her husband, as she reprimanded Lord Montague, saying that he \"shalt not stir one foot to see a foe\" (I.i.82). By persuading her husband to remain calm and not act, she helped preserve peace in Verona.",

        "<strong>Romeo</strong></br>Romeo, the son of Lord Montague and Lady Montague, is a central character in <em>Romeo and Juliet</em>. Towards the beginning, he is naive and doesn't understand the concept of love, believing that Rosaline is the girl he loves most. He remarks that no \"one is fairer than my love\" (I.ii.99), but a few moments later, he proclaims that compared to Juliet, he has \"ne'er saw true beauty till this night\" (I.v.60). The sight of Juliet erases his previous love instantly, emphasizing the naivety and shallowness of his previous love. He is also impulsive, as he does reckless things such as when Romeo \"leapt [the Capulet's] orchard wall\" trying to get a glimpse of Juliet (II.i.6), risking his life on a whim.",

        "<strong>Lord Capulet</strong></br>Lord Capulet is the head of the Capulet family and the father of Juliet. Like Lord Montague, he despises and feuds with the opposing family. When the servants of the family start fighting, he is eager to the join, as he requests his wife to \"[g]ive [him his] long sword\" (I.i.76), looking to incite violence. However, he prevents violence during the Capulet party by acknowledging that Romeo is \"a virtuous and well-governed youth\" (I.v.77).",

        "<strong>Lady Capulet</strong></br>Lady Capulet is the wife of Lord Montague and the mother of Juliet. Like Lady Montague, she looks to bring peace instead of violence, as she questions why \"call he for a sword\" (I.i.77), insisting that he requires a crutch instead.",

        "<strong>Juliet</strong></br>Juliet is the daughter of Lord Capulet and Lady Capulet. She is the source of Romeo's true love, yet she shares much of Romeo's initial ignorance towards love. This is in part due to her inexperience with this topic, as it is a subject \"that [she] dream not of\" (I.iii.71). Her misunderstanding of the inner workings of love lead her to believe that she can control the amount of love she feels when she states that she will \"look to like [Paris], if looking like more\" (I.iii.103). Her first encounter with love is with Romeo, where she begins to grasp its depth and complexity.",

        "<strong>Benvolio</strong></br>Benvolio is mature and peaceful compared to other characters. When the servants of the two families are fighting, despite being a Montague, Benvolio steps in to break up the fight, as he orders the servants to \"[p]ut up [their] swords\" in order to preserve peace (I.i.66).",

        "<strong>Tybalt</strong></br>Tybalt is a Capulet who unlike Benvolio, endorses the idea of fighting between the two families. He declares to Benvolio that he \"hate hell, all Montagues, and thee\" (I.i.72), and when he discovers Romeo at the Capulet's party he attempts to persuade Lord Capulet to allow him to fight \"that villan Romeo\" (I.v.73).",

        "<strong>Paris</strong></br>Paris is Juliet's suitor and the heir to Verona's ruler, Prince Escalus.",

        "<strong>Mercutio</strong></br>Mercutio is a friend of Romeo and Benvolio with blood ties to the Prince and Paris. He jokes about and frowns upon Romeo's ignorance and attitude towards love, stating that \"if love be blind, love cannot hit the mark\" (II.i.36), revealing Mercutio's belief that Romeo's love towards Rosaline is blind and misguided."
    ];

const WIDTH = 1260;
const HEIGHT = 600;

var min_size = 40;
var max_size = 80;
var delta_size = 0.3;

var xloc = [150, 1000, 100, 300, 350, 950, 1050, 800, 100, 1100, 600, 400];
var yloc = [100, 150, 300, 300, 500, 300, 300, 500, 200, 200,    550, 500];
var big = [true, true, false, false, false, false, false, false, false, false, false, false];
var sz = [min_size, min_size, min_size, min_size, min_size, min_size, min_size, min_size, min_size, min_size, min_size, min_size];
var dx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var dy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var color_id = [0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0];
var txt = ["Montagues", "Capulets", "Lord Montague", "Lady Montague", "Romeo", "Lord Capulet", "Lady Capulet", "Juliet", "Benvolio", "Tybalt", "Paris", "Mercutio"];
var graph = [[2, 3, 8], [5, 6, 9], [0, 3, 4], [0, 2, 4], [2, 3, 7, 8, 11], [1 ,6, 7], [1, 5, 7], [5, 6, 4, 9, 10], [0, 4, 11], [1, 7], [7, 11], [4, 8, 10]];
var long_dist = [[4, 7], [7, 4], [4, 8], [8, 4], [0, 8], [8, 0], [1, 9], [9, 1], [8, 11], [11, 8]];
var med_dist = [[4, 8], [8, 4], [7, 9], [9, 7], [10, 11], [11, 10]];
var colors = [[255, 151, 128], [120, 183, 255], [255, 20, 255]];

var wall_buffer = 20;
var wall_force = 40;

var edge_size = 95;

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
            minus = edge_size * 3;
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
            let inv = Math.min(delta_size, (1/(csz+1)) - 0.5);
            csz += inv;
        }else{
            let inv = Math.min(delta_size, (1/(2-csz)) - 0.5);
            csz -= inv;
        }
        sz[i] = map(csz, 0, 1, min_size, max_size);
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
            stroke(0, 0, 0);
            if(Math.min(i, x) == 4 && Math.max(i, x) == 7) stroke(255, 0, 0);
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
        noStroke();
        text(txt[i], xloc[i], yloc[i]);
        stroke(0);
    }
}

function mousePressed(){
    for(let i = 0; i < xloc.length; i++){
        if(collide(i)){
            document.getElementById("info").innerHTML = info[i];
            sz[i] += 20;
        }
    }
}
