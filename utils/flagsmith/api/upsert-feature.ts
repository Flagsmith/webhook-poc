import {IFeaturesResults, IFeatureWithSegment} from "./fetch-feature";
function valueToFeatureState(value:any) {
    const val = getTypedValue(value)
    if (typeof val === 'boolean') {
        return {
            type: 'bool',
            boolean_value: val,
            integer_value: null,
            string_value: null,
        };
    }

    if (typeof val === 'number') {
        return {
            type: 'int',
            boolean_value: null,
            integer_value: val,
            string_value: null,
        };
    }

    return {
        type: 'unicode',
        boolean_value: null,
        integer_value: null,
        string_value: value === null? null : val || '',
    };
}
function getTypedValue(str:any, boolToString?:boolean) {
    if (typeof str === 'undefined') {
        return '';
    }
    if (typeof str !== 'string') {
        return str;
    }

    const isNum = /^\d+$/.test(str);
    if (isNum && parseInt(str) > Number.MAX_SAFE_INTEGER) {
        return `${str}`;
    }


    if (str == 'true') {
        if (boolToString) return 'true';
        return true;
    }
    if (str == 'false') {
        if (boolToString) return 'false';
        return false;
    }

    if (isNum) {
        if (str.indexOf('.') != -1) {
            return parseFloat(str);
        }
        return parseInt(str);
    }

    return str;
}

export default async function (features:IFeaturesResults[],feature:number, environment_key:string, environment:number, enabled:boolean, value:string|null, segment?:number) {
    let matchingFeature:IFeatureWithSegment|undefined;
    features.find((v)=>{
        if (matchingFeature) return
        if (v.environment.api_key  !== environment_key) return false
        return v.features.find((f)=>{
            if (matchingFeature) return
            if (segment) {
                if (f.segment?.id === segment) {
                    matchingFeature = f
                }
            } else {
                if(!f.segment){
                    matchingFeature = f;
                }
            }
        })
    })
    const payload = {environment,feature,feature_segment: segment, enabled: true, feature_state_value: getTypedValue(value)}
    if(!matchingFeature) {
        return fetch(`https://api.flagsmith.com/api/v1/environments/${environment_key}/featurestates/`,{
          method:"POST",
            headers: {
                AUTHORIZATION: `Token ${process.env.FLAGSMITH_TOKEN}`,
                "Content-Type": "application/json",
            },
          body: JSON.stringify(payload)
        }).then((res)=>res.text()).then((res)=>{
            return res
        })
    } else {
        if(segment) {
            return fetch(`https://api.flagsmith.com/api/v1/features/featurestates/${matchingFeature?.id}/`,{
                method:"PUT",
                headers: {
                    AUTHORIZATION: `Token ${process.env.FLAGSMITH_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...matchingFeature,
                    feature,
                    enabled,
                    feature_state_value:valueToFeatureState(value),
                    segment:undefined
                })
            }).then((res)=>res.text()).then((res)=>{
                return res
            })
        }
        return fetch(`https://api.flagsmith.com/api/v1/environments/${environment_key}/featurestates/${matchingFeature?.id}/`,{
            method:"PUT",
            headers: {
                AUTHORIZATION: `Token ${process.env.FLAGSMITH_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...matchingFeature,...payload, segment:undefined})
        }).then((res)=>res.text()).then((res)=>{
            return res
        })
    }
}

