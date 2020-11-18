# WIRID-Lab IoT Data Report - Angular 9

This is an Angular template for reporting device(s) data of WIRID-Lab IoT platform. 
By default this template gets dummy data from the endpoint  https://api.wiridlab.site/api/iot/devices/demo-wirid-lab-iot-data to create some charts. If you want to include your device data, check the [WIRID-Lab Documentation](https://wirid-lab.github.io/docs/iot/http).

Clone this repo and install all dependencies by typing:
```sh
npm install
```

#### Configuration

- In the `environment` folder set your `WIRID_LAB_TOKEN` by the token created in https://wirid-lab.umng.edu.co/#/home/my-iot/tokens
- In the `app.component.ts` set the 'NODE_API_NAME' variable by your device API name
    - Inside  *changeRangeData()*  replace the `selectVariable` variable to filter your value


####  Run 
```sh
npm start
```
Open your browser on http://localhost:4200

#### Docker
If you want to deploy your application for production by using containers, just  type:

```sh
docker-compose up
```
Open your browser on http://localhost:4200


##### Libraries

- Angular 9
- Bootstrap v4.0
- Moment.js
- [Apache Echarts](https://echarts.apache.org/) 




### Screenshot And Demo

Demo: https://stackblitz.com/github/wirid-lab/iot-data-report-angular-template

<img src="/src/assets/Demo-pic.png" alt="Demo">
