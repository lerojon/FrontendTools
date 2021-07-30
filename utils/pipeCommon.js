import certificateTypeList from '@/common/assets/json/dict/data/2892aea36a734262aa99de54d795677c'
import marriageList from '@/common/assets/json/dict/data/59f3f968535c40178cc728ce55ba0eb0'
import certificateValidityList from '@/common/assets/json/dict/data/f3f6e5c166de11eabd450242ac110013'
import sexList from '@/common/assets/json/dict/data/bc0e489fd10d47c7ae35405af9fb2da8'
import provinceData from '@/components/base/picker/region/address/city-data/province.js'
import cityData from '@/components/base/picker/region/address/city-data/city.js'
import areaData from '@/components/base/picker/region/address/city-data/area.js'
import professionList from '@/components/FieldCollapse/data/profession.js'
import taxDeclarationList from '@/common/assets/json/dict/data/76c94ac05b2011eabd450242ac110013'
import medicalPayList from '@/common/assets/json/dict/data/5ad754b2637011eabd450242ac110013'
import relationList from '@/common/assets/json/dict/data/421871ce69d011eabd450242ac110013'
import seqList from '@/common/assets/json/dict/data/5725b3eb637711eabd450242ac110013'
import ratioList from '@/common/assets/json/dict/data/7e264caa662c11eabd450242ac110013'

export function ratioPipe(value){
	if(value){
		let att = [];
		att = ratioList.filter(item => {
			if(item.value === value)
			return true
		})
		return att[0]['label']
	}
	return ''
}

export function seqPipe(value){
	if(value){
		let att = [];
		att = seqList.filter(item => {
			if(item.value === value)
			return true
		})
		return att[0]['label']
	}
	return ''
}

export function certificateTypePipe(value){
	if(value){
		let att = [];
		att = certificateTypeList.filter(item => {
			if(item.value === value)
			return true
		})
		return att[0]['label']
	}
	return ''
}

export function marriagePipe(value){
	if(value){
		let att = [];
		att = marriageList.filter(item => {
			if(item.value === value)
			return true
		})
		return att[0]['label']
	}
	return ''
}

export function certificateValidityPipe(value){
	if(value){
		let att = [];
		att = certificateValidityList.filter(item => {
			if(item.value === value)
			return true
		})
		return att[0]['label']
	}
	return ''
}

export function sexPipe(value){
	if(value){
		let att = [];
		att = sexList.filter(item => {
			if(item.value === value)
			return true
		})
		return att[0]['label']
	}
	return ''
}

export function provincePipe(value){
	if(value){
		let att = [];
		att = provinceData.filter(item => {
			if(item.value === value)
			return true
		})
		return att[0]['label']
	}
	return ''
}

export function cityPipe(value){
	if(value){
		let lab;
		for (let i=0,len=cityData.length;i<len;i++){
			if(cityData[i] instanceof Array){
				for(let j=0,ln=cityData[i].lentth;j<ln;j++){
					if(cityData[i][j] instanceof Array){
						for(let k=0,lg=cityData[i][j].length;k<lg;k++){
							if(cityData[i][j][k].value === value){
								lab = cityData[i][j][k]['lable']
								return
							}
						}
					} else {
						if(cityData[i][j].value === value){
							lab = cityData[i][j]['lable']
							return
						}
					}
				}
			} else {
				if(cityData[i].value === value){
					lab = cityData[i]['label']
					return
				}
			}
		}
		return lab
	}
	return ''
}

export function areaPipe(value){
	if(value){
		let lab;
		for (let i=0,len=areaData.length;i<len;i++){
			if(areaData[i] instanceof Array){
				for(let j=0,ln=areaData[i].lentth;j<ln;j++){
					if(areaData[i][j] instanceof Array){
						for(let k=0,lg=areaData[i][j].length;k<lg;k++){
							if(areaData[i][j][k].value === value){
								lab = areaData[i][j][k]['lable']
								return
							}
						}
					} else {
						if(areaData[i][j].value === value){
							lab = areaData[i][j]['lable']
							return
						}
					}
				}
			} else {
				if(areaData[i].value === value){
					lab = areaData[i]['label']
					return
				}
			}
		}
		return lab
	}
	return ''
}

export function professionPipe(value){
	if(value){
		let att = [];
		professionList.map(item =>{
			if(item.children && item.children.length){
				item.children.map(it => {
					if(it.children && it.children.length){
						it.children.map(obj => {
							if(obj.id === value){
								att.push(obj)
							}
						})
					}
				})
			}
		})
		return att[0]['name']
	}
	return ''
}

export function taxDeclarationPipe(value){
	if(value){
		let att = [];
		att = taxDeclarationList.filter(item => {
			if(item.value === value)
			return true
		})
		return att[0]['label']
	}
	return ''
}

export function medicalPayPipe(value){
	if(value){
		let att = [];
		att = medicalPayList.filter(item => {
			if(item.value === value)
			return true
		})
		return att[0]['label']
	}
	return ''
}

export function relationPipe(value){
	if(value){
		let att = [];
		att = relationList.filter(item => {
			if(item.value === value)
			return true
		})
		return att[0]['label']
	}
	return ''
}





