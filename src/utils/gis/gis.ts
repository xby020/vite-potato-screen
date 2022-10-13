import '@amap/amap-jsapi-types';

export interface WeatherResult {
  adcode: string;
  city: string;
  forecasts: Forecast[];
  info: string;
  province: string;
  reportTime: string;
}

export interface Forecast {
  date: string;
  dayTemp: number;
  dayWeather: string;
  dayWindDir: string;
  dayWindPower: string;
  nightTemp: number;
  nightWeather: string;
  nightWindDir: string;
  nightWindPower: string;
  week: string;
}

export async function getWeather(place: string) {
  //@ts-ignore
  const weather = new window.AMap.Weather();
  return new Promise<WeatherResult>((resolve, reject) => {
    weather.getForecast(place, function (status: any, result: any) {
      if (result && result.info === 'OK') {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });
}

export interface CamAnimationOptions {
  center: [number, number];
  zoom: number;
  duration?: number;
  pitch?: number;
  rotation?: number;
}

export async function flyTo(options: CamAnimationOptions) {
  const duration = options.duration || 2000;
  const pitch = options.pitch || 0;
  const rotation = options.rotation || 0;

  return new Promise<void>((resolve) => {
    window.loca.viewControl.addAnimates(
      [
        {
          center: {
            value: options.center, // 动画终点的经纬度
            control: [options.center, options.center], // 过渡中的轨迹控制点，地图上的经纬度
            timing: [0.42, 0, 0.4, 1], // 动画时间控制点
            duration: duration // 过渡时间，毫秒（ms）
          },
          pitch: {
            value: pitch,
            control: [
              [0.3, options.pitch],
              [0.4, options.pitch]
            ],
            timing: [0.42, 0, 0.4, 1],
            duration
          },
          zoom: {
            value: options.zoom,
            control: [
              [0.4, options.zoom],
              [0.6, options.zoom]
            ],
            timing: [0.42, 0, 0.4, 1],
            duration
          },
          rotation: {
            value: rotation,
            control: [
              [0.4, rotation],
              [0.6, rotation]
            ],
            timing: [0.42, 0, 0.4, 1],
            duration
          }
        }
      ],
      function () {
        resolve();
      }
    );
  });
}

export async function getDistrict(name: string) {
  const districtSearch = new window.AMap.DistrictSearch({
    level: 'district',
    subdistrict: 1,
    extensions: 'all'
  });
  return new Promise((resolve, reject) => {
    districtSearch.search(name, function (status: any, result: any) {
      if (status === 'complete') {
        resolve(result.districtList);
      } else {
        reject(result);
      }
    });
  });
}

export function createGeoFence(coords: [number, number][], color: number) {
  // 创建点击区域
  const pl = new window.Loca.PolygonLayer({
    loca: window.loca,
    zIndex: 120,
    cullface: 'none',
    shininess: 1,
    hasBottom: false,
    blockHide: false,
    hasSide: true,
    hasTop: false,
    depth: true
  });
  const plGeo = new window.Loca.GeoJSONSource({
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [coords]
          }
        }
      ]
    }
  });
  pl.setSource(plGeo);
  const plColor = '#1BF2F1';
  pl.setStyle({
    topColor: function () {
      return 'rgba(16,128,165,0.1)';
    },
    sideTopColor: function () {
      return 'rgba(17,79,104,0.1)';
    },
    sideBottomColor: function () {
      return 'rgba(30,215,147,1)';
    },
    height: 300,
    altitude: 0
  });

  const fence = pl;
  return {
    fence
  };
}
