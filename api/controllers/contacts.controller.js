const Contact = require('../../models/contact.model');


createNewContact = async (req,res,next) => {
    if(req.isUnauthenticated()) {
        return res.status(403).json({
            status : 'error',
            messages : [
                {
                    message : 'Request is not authenticated !'
                }
            ]
        });
    } 
    

    try {
        const UID = req.user._id;

        const contactFirstName = req.body.txtFirstName;
        const contactLastName = req.body.txtLastName;

        const infoAddress = req.body.txtAddress || '';
        const infoAge = req.body.txtAge || '';
        const infoPhone = req.body.txtPhone || '';
        const infoBirthday = req.body.txtBirthday || '';

        const socialFacebook = req.body.txtFacebook || '';
        const socialInstagram = req.body.txtInstagram | '';
        const socialSkype = req.body.txtSkyp || '';
        const socialEmail = req.body.txtEmail || '';
        const socialWebsite = req.body.txtWebsite || '';

        await Contact.create({
            userId : UID,
            name : {
                firstName : contactFirstName,
                lastName: contactLastName
            },
            info : {
                phone : infoPhone,
                address: infoAddress,
                age : infoAge,
                birthday : new Data(infoBirthday),
            },
            socialInfo : {
                email : socialEmail,
                facebook : socialFacebook,
                instagram : socialInstagram,
                skype: socialSkype,
                website : socialWebsite
            }
        }, (user, error) => {
            if(error) {
               return next(error);
            }
        });

        return res.status(200).json({
            status : "success",
            data : [],
            message : [
                {
                    message : 'Create new contact success',
                }
            ]
        })

        
    } catch (error) {
        
    }
}

