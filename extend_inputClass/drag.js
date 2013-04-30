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
 * over ride
 */
tm.input.Mouse.prototype.init = function(element) {
    this.element = element || window.document;
    
    this.position       = tm.geom.Vector2(0, 0);
    this.deltaPosition  = tm.geom.Vector2(0, 0);
    this.prevPosition   = tm.geom.Vector2(0, 0);
    
    //-------------------------拡張------------------------------
    this.dragStartPosition = null;
    this._isClick = false;
    this._limitOneFrame = 0;
    this._isMove = false;
    //-----------------------------------------------------------
    
    var self = this;
    this.element.addEventListener("mousemove", function(e){
        // 座標更新
        self._mousemove(e);
    });
    this.element.addEventListener("mousedown", function(e){
        self.button |= 1<<e.button;
    });
    this.element.addEventListener("mouseup", function(e){
        self.button &= ~(1<<e.button);
    });
    this.element.addEventListener("mouseover", function(e){
        // 座標更新
        self._mousemove(e);
        self.prevPosition.setObject(self.position);
    });
};

tm.input.Mouse.prototype.update = function() {
    this.last = this.press;
    
    this.press = this.button;
    
    this.down = (this.press ^ this.last) & this.press;
    this.up   = (this.press ^ this.last) & this.last;
    
    // 変化値を保存
    this.deltaPosition.setObject(this.position).sub(this.prevPosition);
    
    // 前回の座標を保存
    this.prevPosition.setObject(this.position);
    
    //-------------------------拡張------------------------------
    if (this._limitOneFrame > 0) { --this._limitOneFrame; } // 指定フレームずらして判定させるための苦肉の策
    //-----------------------------------------------------------
};

//-------------------------拡張------------------------------
tm.input.Mouse.prototype.getPointingStart = function() {
    if (this.getButtonDown("left")) {
        this.dragStartPosition = this.position.clone();
        this._isMove = true;
        return true;
    }
    return false;
};
tm.input.Mouse.prototype.getPointingEnd = function() {
    if (this.getButtonUp("left")) {
        this._isClick = false;
        this._isMove = false;
        return true;
    }
    return false;
};
tm.input.Mouse.RECOGNIZE_DRAGED_PIXEL = 3;
tm.input.Mouse.prototype.getDrag = function() {
    this.getPointingStart();
    this.getPointingEnd();
    if (this._isMove &&
        Math.abs(this.dragStartPosition.x - this.position.x) + Math.abs(this.dragStartPosition.y - this.position.y) > tm.input.Mouse.RECOGNIZE_DRAGED_PIXEL) {
        this._isClick = true;
        this._limitOneFrame = 2;
        return true;
    }
    else if (this._isClick) {
        this._limitOneFrame = 1;
        return true;
    }
    else if (this._limitOneFrame > 0) {
        return true;
    }
    else {
        return false;
    }
};
tm.input.Mouse.prototype.getPointingEndNonDrag = function() {
    return this.getPointingEnd() && !this.getDrag();
};
//-----------------------------------------------------------


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------


tm.input.Touch.prototype.init = function(element) {
    this.element = element || window.document;
    
    this.position       = tm.geom.Vector2(0, 0);
    this.deltaPosition  = tm.geom.Vector2(0, 0);
    this.prevPosition   = tm.geom.Vector2(0, 0);
    
    //-------------------------拡張------------------------------
    this.dragStartPosition = null;
    this._isClick = false;
    this._limitOneFrame = 0;
    this._isMove = false;
    this._touch = false;
    //-----------------------------------------------------------
    
    var self = this;
    this.element.addEventListener("touchstart", function(e){
        self._touchmove(e);
        self.prevPosition.setObject(self.position);
        self.touched = true;
    });
    this.element.addEventListener("touchend", function(e){
        self.touched = false;
    });
    this.element.addEventListener("touchmove", function(e){
        self._touchmove(e);
        // 画面移動を止める
        e.stop();
    });
};

tm.input.Touch.prototype.update = function() {
    this.last   = this.now;
    this.now    = Number(this.touched);
    
    this.start  = (this.now ^ this.last) & this.now;
    this.end    = (this.now ^ this.last) & this.last;
    
    // 変化値を保存
    this.deltaPosition.setObject(this.position).sub(this.prevPosition);
    
    // 前回の座標を保存
    this.prevPosition.setObject(this.position);
    
    //-------------------------拡張------------------------------
    if (this._limitOneFrame > 0) { --this._limitOneFrame; } // 指定フレームずらして判定させるための苦肉の策
    //-----------------------------------------------------------
};

//-------------------------拡張------------------------------
tm.input.Touch.prototype.getTouchStart = function() {
    if (!!this.start != false) {
        this.dragStartPosition = this.position.clone();
        this._isMove = true;
        return true;
    }
    return false;
};
tm.input.Touch.prototype.getTouchEnd = function() {
    if (!!this.end != false) {
        this._isClick = false;
        this._isMove = false;
        return true;
    }
    return false;
};
tm.input.Touch.prototype.getPointingStart   = tm.input.Touch.prototype.getTouchStart;
tm.input.Touch.prototype.getPointingEnd     = tm.input.Touch.prototype.getTouchEnd;

tm.input.Touch.RECOGNIZE_DRAGED_PIXEL = 3;
tm.input.Touch.prototype.getDrag = function() {
    this.getPointingStart();
    this.getPointingEnd();
    if (this._isMove &&
        Math.abs(this.dragStartPosition.x - this.position.x) + Math.abs(this.dragStartPosition.y - this.position.y) > tm.input.Mouse.RECOGNIZE_DRAGED_PIXEL) {
        this._isClick = true;
        this._limitOneFrame = 2;
        return true;
    }
    else if (this._isClick) {
        this._limitOneFrame = 1;
        return true;
    }
    else if (this._limitOneFrame > 0) {
        return true;
    }
    else {
        return false;
    }
};
tm.input.Touch.prototype.getPointingEndNonDrag = function() {
    return this.getPointingEnd() && !this.getDrag();
};
//-----------------------------------------------------------





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