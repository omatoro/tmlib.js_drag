tmlib.jsでドラッグ実装
========

##inputClass拡張

http://jsdo.it/omatoro/hNBP

##inputClassを拡張せずにドラッグ実装

http://jsdo.it/omatoro/7iif


##動作内容
###クリックした瞬間(getPointingStart()===true)
* getDrag()===false
* pointingmove: 実行開始(true)

###ドラッグしながら指定のpixel数をドラッグ
* getDrag()===true
* pointingmove: 実行中(true)

###クリック終了した瞬間(getPointingEnd()===true)
* getDrag()===true
* pointingmove: 実行中(true)

###クリック終了した瞬間の次フレーム時
* getDrag()===false
* pointingmove: 実行されない(false)

##ドラッグしていないpointingEndを取得したい場合は？
app.pointing.getPointingEndNonDrag()

getDrag() && getPointingEnd() を返り値としています。

クリック終了した瞬間(getPointingEnd()===true)まで、getDrag()がtrueを返すのはこのためです。

##inputクラスを拡張しない場合
http://jsdo.it/omatoro/7iif -> クラス単位で調査するので、ピンポイントで使用するならすっきりかけます

まどろっこしい処理をしているのは、ドラッグしていないクリックであるにも拘わらず、
ドラッグしたクリックだと常に認識してしまうクラスが出てきてしまったためです。

(常にgetPointingEndNonDrag() -> false)
