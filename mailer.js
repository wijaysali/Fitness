const nodemailer = require('nodemailer')
const schedule = require('node-schedule')
const userInfoApi = require('./models/dbApi').userInfoAPI
const moment = require('moment')

let weekDate = ''

const rule = new schedule.RecurrenceRule()
rule.dayOfWeek = 1
rule.hour = 16
rule.minute = 59
rule.second = 0
schedule.scheduleJob(rule, () => {
	const smtpTransport = nodemailer.createTransport({
		host: 'xxxx',
		secureConnection: false,
		port: 25,
		auth: {
			user: 'xxxx',
			pass: 'xxxx'
		}
	})
	const mailOptions = {
		from: "xxxx",
		to: '',
		subject: 'xxxx',
		html: ''
	}


	userInfoApi.getMailData().then((resdata) => {
		weekDate =  new moment().day("Monday").format("YYYYMMDD")
		resdata.forEach((p) => {
		    const uname = p.name
		    let counts = [0,0,0,0]
		    let planNum = [0,0,0,0]
		    let completeRate = [0,0,0,0]
		    p.dayComplete.forEach((v) => {
		      if(parseInt(v.timeId) >= parseInt(weekDate)) {             
		        v.items.forEach((s) => {
		          counts[s.p_type-1] += parseInt(s.counts) || 0
		        })
		      }
		    })
		  	p.plans.forEach((o) => {
		  		if(o.timeStamp === weekDate && o.w_m_type === 0) {
		  			o.pNums.forEach((s) => {
		  				planNum[s.p_type-1] = parseInt(s.counts) || 0
		  			})
		  		}
		  	})
		  	if(!planNum[0] && !planNum[1] && !planNum[2] && !planNum[3]) {
		  		mailOptions.html = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'+uname+', Hi: </br>'+
		  			'&emsp;&emsp;Please prepare your package! :)'
		  	} else {
		  		planNum.forEach((item, i) => {
		  			if(item === 0) {
		  				completeRate[i] = 0
		  			} else {
		  				completeRate[i] = (counts[i]/item*100).toFixed(2)
		  			}
		  		})
			  	mailOptions.html = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">'+uname+', Hi: </br>'+
			  			'&emsp;&emsp;Below This【'+uname+'】your Fitness Content this week</br>'+
			  			'<ul>'+
			  				'<li> Pullup Mark：'+'<strong>'+planNum[0]+'</strong>'+', end this week+completeRate[0]+'%'+'</li>'+
			  				'<li> Pushup：'+'<strong>'+planNum[1]+'</strong>'+', end this week'+completeRate[1]+'%'+'</li>'+
			  				'<li> Situp：'+'<strong>'+planNum[2]+'</strong>'+', end this week'+completeRate[2]+'%'+'</li>'+
			  				'<li> Squat：'+'<strong>'+planNum[3]+'</strong>'+', end this week'+completeRate[3]+'%'+'</li>'+
			  			'</ul></br>'+
			  			'Hope you always healthy! :)'
	  		}
		  	mailOptions.to = p.mail

		  	smtpTransport.sendMail(mailOptions, function(err, res) {
				if(err) {
					console.log(err)
				} else {
					console.log("Sent Successful !!");
				}
			})
		})
	}).catch((err) => {
		console.log(err)
	})
})

module.exports = schedule