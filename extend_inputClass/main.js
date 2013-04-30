/*
 * constant
 */
var SCREEN_WIDTH    = 465;
var SCREEN_HEIGHT   = 465;
var SCREEN_CENTER_X = SCREEN_WIDTH/2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;

// ラベルのリスト
var UI_DATA = {
    LABELS: {
        children: [{
            type: "Label",
            name: "test1",
            x: 20,
            y: 80,
            width: SCREEN_WIDTH,
            fillStyle: "white",
            text: " ",
            fontSize: 20,
            align: "left"
        }, {
            type: "Label",
            name: "test2",
            x: 20,
            y: 120,
            width: SCREEN_WIDTH,
            fillStyle: "white",
            text: " ",
            fontSize: 20,
            align: "left"
        }, {
            type: "Label",
            name: "test3",
            x: 20,
            y: 160,
            width: SCREEN_WIDTH,
            fillStyle: "white",
            text: " ",
            fontSize: 20,
            align: "left"
        }, {
            type: "Label",
            name: "test4",
            x: 20,
            y: 200,
            width: SCREEN_WIDTH,
            fillStyle: "white",
            text: " ",
            fontSize: 20,
            align: "left"
        }]
    }
};

/*
 * main
 */
tm.main(function() {
    // canvas インスタンス生成
    var app = tm.app.CanvasApp("#world");
    // リサイズ
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    // 画面フィット
    app.fitWindow();
    // 背景色をセット
    app.background = "rgba(0, 0, 0, 1.0)";
    // シーン指定
    app.replaceScene(MainScene());
    // 実行
    app.run();
});


/*
 * MainScene
 */
var MainScene = tm.createClass({
    superClass: tm.app.Scene,
    
    init: function() {
        this.superInit();
        
        // ラベル表示
        this.fromJSON(UI_DATA.LABELS);
    },
    
    update: function(app) {
        // pointingmoveだとクリックなのかドラッグなのか識別できない
        this.test1.text = "getDrag : " + app.pointing.getDrag();
        this.test2.text = "without drag pointing end : " + app.pointing.getPointingEndNonDrag();
        this.test3.text = "start : " + app.pointing.getPointingStart();
        this.test4.text = "end : " + app.pointing.getPointingEnd();
    }
});