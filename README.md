# WIRID-Lab IoT Data Report - Angular 9

This is an Angular template for reporting device(s) data of WIRID-Lab IoT platform. 
By default this template gets dummy data from the endpoint  https://api.wiridlab.site/api/iot/devices/demo-wirid-lab-iot-data to create some charts. If you want to include your device data, check the [WIRID-Lab Documentation](https://wirid-lab.github.io/docs/iot/http).

Clone this repo and install all dependencies by typing:
```sh
npm install
```

#### Configuration

- In the `environment` folder set your `WIRID_LAB_TOKEN` by the token created in your IoT Platform
- In The `app.component.ts` you will find the *getDataByNodeId(<apiName>)* function,  replace the `<apiName>` by your device API name
- Inside  *changeRangeData()*  replace the `selectData` variable to filter values


####  Run 
```sh
npm start
```

#### Docker
If you want to deploy your application by using containers type:

```sh
docker-compose up
```
Access in your browser http://localhost:4200