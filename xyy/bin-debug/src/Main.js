var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        egret.Injector.mapClass(RES.AnalyzerBase, RES.PropertiesAnalyzer, RES.PropertiesAnalyzer.TYPE);
        this.addChild(GameConfig.gameScene());
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        //      RES.loadGroup("gameres");
    };
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("loading");
    };
    //  private onGroupComplete(){
    //  	this._viewManager=new ViewManager(this,RES.getRes("gameres_json"))
    //
    //  }
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName == "gameres") {
            PopUpManager.removePopUp(this.loadingPanel);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
        else if (event.groupName == "loading") {
            this.loadingPanel = new LoadingPanel();
            PopUpManager.addPopUp(this.loadingPanel);
            RES.loadGroup("gameres");
        }
    };
    __egretProto__.onResourceProgress = function (event) {
        if (event.groupName == "gameres") {
            this.loadingPanel.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * ������Ϸ����
     */
    __egretProto__.createGameScene = function () {
        PanelManager.initPanel();
        window["onorientationchange"] = function () {
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onOrientationChange, window["orientation"], false));
            if (GlobalData.isVerticalGame && GlobalData.initIsVertical && (window["orientation"] != 0)) {
                location.reload();
            }
            if (GlobalData.isVerticalGame && GameConfig.isVertical()) {
                NativeApi.showVerticalTips(true);
            }
            else if (GlobalData.isVerticalGame && !GameConfig.isVertical()) {
                NativeApi.removeVerticalTips();
            }
        };
        if (GlobalData.isVerticalGame && GameConfig.isVertical()) {
            NativeApi.showVerticalTips();
        }
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);
        //      Global.shareToWeiXin("EGER���ٿ�������", "EGER�����������У�������ȡ��ʾ�����ɣ�", "http://wx.9ria.com/games/eger", "http://wx.9ria.com/games/eger/resource/assets/icon.png");
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
