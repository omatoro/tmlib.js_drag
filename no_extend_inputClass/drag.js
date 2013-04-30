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
        
        // ドラッグ処理
        this.dragStartPosition = null;
        this._isClick = false;
        this._isMove = false;
        var RECOGNIZE_DRAGED_PIXEL = 3;
        
        this.addEventListener("pointingstart", function(e) {
            this.dragStartPosition = e.app.pointing.position.clone();
            this._isMove = true;
        });
        this.addEventListener("pointingmove", function(e) {

        });
        this.addEventListener("pointingend", function() {
            this._isClick = false;
            this._isMove = false;
        });
        this.getDrag = function (app) {
            if (this._isMove &&
                Math.abs(this.dragStartPosition.x - app.pointing.position.x) + Math.abs(this.dragStartPosition.y - app.pointing.position.y) > RECOGNIZE_DRAGED_PIXEL) {
                this._isClick = true;
                return true;
            }
            else if (this._isClick) { // クリックした周辺も返り値がtrueになるようにする
                return true;
            }
            else {
                return false;
            }
        };
        this.getEndNonDrag = function (app) {
            return app.pointing.getPointingEnd() && !this.getDrag(app);
        };
    },
    
    update: function(app) {
        this.test1.text = "getDrag : " + this.getDrag(app);
        this.test2.text = "without drag pointing end : " + this.getEndNonDrag(app);
        this.test3.text = "start : " + app.pointing.getPointingStart();
        this.test4.text = "end : " + app.pointing.getPointingEnd();
    }
});