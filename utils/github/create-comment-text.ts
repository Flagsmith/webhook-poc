import { IFeaturesResults} from "../flagsmith/fetch-feature";
import moment from 'moment'
import jsdom from 'jsdom'
import toml from 'toml'
import yaml from 'yaml'
export default function (data:IFeaturesResults[]) {
    return `Flagsmith Feature:
${data.map((v)=>{
        return `**${v.environment.name}**
${v.features.map((v)=>{
            let featureValue = v.feature_state_value.integer_value || v.feature_state_value.string_value || v.feature_state_value.boolean_value
            let language = ''
                try {
                    new jsdom.JSDOM(featureValue).serialize()
                    language = 'xml'
                } catch (e) {
                    try {
                        yaml.parse(featureValue)
                        language = 'yaml'
                    } catch (e) {
                        try {
                            toml.parse(featureValue)
                            language = 'toml'
                        } catch (e) {
                            try {
                                JSON.stringify(featureValue, null, 2)
                                language = 'json'
                            } catch (e) {
                                
                            }
                        }
                    }
                }
            
            
            const hasFeature = featureValue!=null && typeof featureValue!='undefined'
            return `- [${v.enabled?'x':' '}] ${v.segment?v.segment.name:'Environment Default'}${hasFeature?
`
\`\`\`${language}
${featureValue}
\`\`\`
`:''}`
}).join("\n")}
`}).join("\n")}

Last Updated ${moment().format("Do MMM YYYY HH:mma")}
`
}
