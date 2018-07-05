
module.exports = function(app,Room){
    
    app.get('/room',function(req,res){
        console.log('GET /room 라우팅 함수 호출');
    
        /*   TODO : room DB에서 룸정보 가저오기 
                    방제,인원,날짜,지역,성별,가격,소개*/
      //  Room.find(function(err,rooms){
            
         //   if(err) return res.status(500).send({error:'database failure'});
            
            res.json({statusCode :'200' , statusMsg : 'success', total :'2' ,
                      resultList:[{roomId :'_id1' , title : 'dlgmlals', ageMin:'30',ageMax :'40',gender :'m',price:'50000',openUrl:'asdfasdf',intro :'123213'},
                                  {roomId :'_id2' , title : 'gjrbdnjs', ageMin:'30',ageMax :'40',gender :'m',price:'50000',openUrl:'asdfasdf',intro :'123213'}
                                 ]});
            
        });
    
/*    app.put('/room',function(req,res){
        console.log('PUT /room 라우팅 함수에서 호출');
       // TODO : room DB에 room 정보 수정 
        
    })*/
/*    app.delete('/room',function(req,res){
        console.log('DELETE /room 라우팅 함수에서 호출');
      // TODO : room DB에서 room 삭제
        res.end();
    
    })*/
    app.post('/room',function(req,res){
        console.log('POST /room 라우팅 함수에서 호출');
     /*  TODO :  room DB에 룸 생성, 정보 INSERT
    방제,인원,날짜,지역,성별,가격,소개,오픈채팅URL*/
        
   /*       var room = new Room();
    
        room.title = req.body.title;
        room.ageMin = req.body.ageMin;
        room.ageMax = req.body.ageMax;
        //room.regDate = new Date(req.body.publishes_date);
        room.gender = req.body.gender;
        room.price = req.body.price;
        room.openUrl = req.body.openUrl;
        room.intro = req.body.explain;
        

        
        room.save(function(err){
            if(err){
                
                console.error(err);
                res.json({result:0});
                return;
            }
            
            res.json({result:1});*/
        
        res.json({statusCode :'200' , statusMsg : 'success'});
     

    });
   app.get('/room/:roomId',function(req,res){
        console.log('GET /room/:roomId 라우팅 함수에서 호출');
    /*TODO : room DB 에서 roomId의 정보를 조회*/
        
  /*        Room.findOne({title : req.params.roomId},function(err,room){
            if(err) return res.status(500).json({error:err});
            if(!room) return res.status(404).json({error:'room not found'});
            
            res.json(room);*/
            res.json({statusCode :'200' , statusMsg : 'success',result:{roomId :'_id2' , title : 'gjrbdnjs', ageMin:'30',ageMax :'40',gender :'m',price:'50000',openUrl:'asdfasdf',intro :'123213'}});
  


    })
    
    app.put('/room/:roomId',function(req,res){
        console.log('PUT /room/:roomId 라우팅 함수에서 호출');
      /*  Room.findById(req.params.roomId,function(err,room){
            if(err) return res.status(500).json({error:'database failure'});
            if(!room) return res.status(404).json({error : 'book not found'});
            
            if(req.body.title) room.title = req.body.title;
            if(req.body.ageMin) room.ageMin = req.body.ageMin;
            if(req.body.ageMax)room.ageMax = req.body.ageMax;
            //room.date = new Date(req.body.publishes_date);
            if(req.body.sex) room.sex = req.body.sex;
            if(req.body.price) room.price = req.body.price;
            if(req.body.openUrl) room.openUrl = req.body.openUrl;
            if(req.body.explain) room.explain = req.body.explain;
            
            room.save(function(err){
                if(err) res.status(500).json({error:'failed to update'});
                res.json({message : 'room updated'});
            })
        
        })*/
           res.json({statusCode :'200' , statusMsg : 'success'});
    
    })
 
    app.delete('/room/:roomId',function(req,res){
        console.log('DELETE /room/:roomId 라우팅 함수에서 호출');
     /*TODO : room DB 에서 roomId를 삭제*/
/*           Room.remove({title : req.params.roomId},function(err,output){
                if(err) return res.status(500).json({error:"database failure"});
                if(!output.result.n) return res.status(404).json({error:'room not found'});
                res.json({message:"book deleted"});
               
                res.status(204).end();
        })
        */
         res.json({statusCode :'200' , statusMsg : 'success'});
       
    })


    app.get('/room/list/:keyword',function(req,res){
    //room list 키워드 검색
    console.log('GET /room/list/:keyword 라우팅 함수에서 호출');
    var keyword = req.query.keyword;

    /* TODO :   room list를 DB에서 가져오기*/
        
   res.json({statusCode :'200' , statusMsg : 'success', total :'2' ,
                      resultList:[{roomId :'_id1' , title : 'dlgmlals', ageMin:'30',ageMax :'40',gender :'m',price:'50000',openUrl:'asdfasdf',intro :'123213'},
                                  {roomId :'_id2' , title : 'gjrbdnjs', ageMin:'30',ageMax :'40',gender :'m',price:'50000',openUrl:'asdfasdf',intro :'123213'}
                                 ]});

    });

    app.get('/member/requester-room/:roomId',function(req,res){
        /* TODO : 내 ROOM에 신청한 멤버 조회*/
        res.json({statusCode :'200' , statusMsg : 'success', total :'2' ,resultList:[{memberId : 'dlgmlals3'},
                                                                                    {memberId : 'gjrbdnjs'}]});
    
    })

    app.post('/room/requester-room',function(req,res){
   /* 참가신청 
      room member에 insert*/
    
        res.json({statusCode :'200' , statusMsg : 'success'});
    })

    app.get('/room/requester-room/:memberId',function(req,res){
   /* TODO : ROOM에 신청한 멤버 조회*/
   res.json({statusCode :'200' , statusMsg : 'success', total :'2' ,
                      resultList:[{roomId :'_id1' , title : 'dlgmlals', ageMin:'30',ageMax :'40',gender :'m',price:'50000',openUrl:'asdfasdf',intro :'123213'},
                                  {roomId :'_id2' , title : 'gjrbdnjs', ageMin:'30',ageMax :'40',gender :'m',price:'50000',openUrl:'asdfasdf',intro :'123213'}
                                 ]});

    });


    app.delete('/room/requester-room/:memberId',function(req,res){
    /* TODO : ROOM에 신청한 멤버 삭제*/
        res.json({statusCode :'200' , statusMsg : 'success'});
    })

}
