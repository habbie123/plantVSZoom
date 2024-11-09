import { _decorator, Component, Enum, Node, Sprite, instantiate, EventMouse } from 'cc';
const { ccclass, property } = _decorator;
import { StatusEnum, CardStats, PlantType } from '../glob/StatusEnum';
import { ControlSun } from '../glob/ControlSun';
import { MouseManage } from './MouseManage';


@ccclass('Card')
export class Card extends Component {

    private cardstatus: CardStats = CardStats.Cooling;//卡片状态

    @property(Node)
    public cardLight: Node = null;//卡片亮的时候

    @property(Node)
    public cardDark: Node = null;//卡片暗的时候

    @property(Sprite)
    public cardMask: Sprite = null;//卡片准备的时候


    @property(Number)
    public cdTime: number = 2;//卡片冷却时间

    private cdTimer: number = 0;//卡片冷却计时器

    @property({ type: Number, tooltip: "需要太阳总数" })
    private needSun: number = 50;
    @property({ type: Enum(PlantType)})
    private plantType:PlantType = null;

    start() {
        this.cdTimer = this.cdTime;
    }

    update(deltaTime: number) {

        switch (this.cardstatus) {
            case CardStats.Cooling:
                this.coolingUpdate(deltaTime);
                break;
            case CardStats.WaitingSun:
                this.waitingSunUpdate(deltaTime);
                break;
            case CardStats.Ready:
                this.readyUpdate(deltaTime);
                break;
        }

    }
    coolingUpdate(deltaTime: number) {
        if (this.cardMask.fillRange > 0) {
            this.cardMask.fillRange -= deltaTime;
        } else {
            this.transitionToWaitingSun();
            // this.waitingSunUpdate(deltaTime);
        }

    }
    transitionToWaitingSun() {
        if (this.cardstatus == CardStats.Cooling) {
            this.cardstatus = CardStats.WaitingSun;
        }

        // this.cardLight.active = false;
        // this.cardDark.active = true;
    }
    waitingSunUpdate(deltaTime: number) {
        // console.log('当前需求, 太阳总数', this.needSun, ControlSun.Instance.takeSunCount());
        if (this.needSun <= ControlSun.Instance.takeSunCount()) {
            this.cardstatus = CardStats.Ready;
            this.cardLight.active = true;
            this.cardDark.active = false;
        }
    }
    readyUpdate(deltaTime: number) {
        if (this.needSun > ControlSun.Instance.takeSunCount()) {
            this.cardLight.active = false;
            this.cardDark.active = true;
            this.cardstatus = CardStats.Cooling;
            this.cardMask.fillRange = 1;
        }

    }

    transitionToCooling() {
        this.cardstatus = CardStats.Cooling;
        this.cardLight.active = false;
        this.cardDark.active = true;
        this.cardMask.fillRange = 1;
    }
    clickHandler(event: EventMouse) {
        console.log("点击卡片");
        if(MouseManage.Instance.getCurrentPlant() != null)return;
        if (this.cardstatus == CardStats.Ready && ControlSun.Instance.takeSunCount() >= this.needSun) {
            MouseManage.Instance.addPlant(this.plantType,event);
            ControlSun.Instance.updateSunCount(-this.needSun);
            this.transitionToCooling();
        }
    }

}


