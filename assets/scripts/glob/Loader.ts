import { _decorator, assetManager, Component, Node ,Prefab,resources} from 'cc';
import { PlantType } from './StatusEnum';
const { ccclass, property } = _decorator;

@ccclass('Loader')
export class Loader extends Component {
    //植物类型和预制体的映射
    private static plantPrefab:Map<PlantType, Prefab> = new Map();

    start() {
        
    }
     
    protected onLoad(): void {
        console.log('开始加载资源');
        Loader.LOAD('prefab/plant/sunflower', (prefab:Prefab) => {
            Loader.plantPrefab.set(PlantType.Sunflower, prefab);
        });
        Loader.LOAD('prefab/plant/peashooter', (prefab:Prefab) => {
            Loader.plantPrefab.set(PlantType.Peashooter, prefab);
        });
    }
    public static getPlantPrefab(type:PlantType):Prefab{
        return Loader.plantPrefab.get(type);
    }

    update(deltaTime: number) {
        
    }
    /**
     * 动态加载预制体
     * @param path assets开始的路径
     * @param callback 获取到资源回调
     */
    static LOAD(path:string, callback:Function) {
        resources.load(path, (err, prefab) => {
            if (err) {
                console.error('Failed to load Prefab:', err);
                return;
            }
            callback(prefab);
        });

        // assetManager.loadAny(path, (err, asset) => {
        //     if (err) {
        //         console.error('Failed to load asset:',path, err);
        //         return;
        //     }
        //     callback(asset);
        // });
    }
}


