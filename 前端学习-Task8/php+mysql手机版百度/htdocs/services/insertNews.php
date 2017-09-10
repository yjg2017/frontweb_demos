<?php
	header("Content-type:application/json;charset=utf-8");
	require_once('mysqlHelper.php');
	if($link){
		//插入新闻
		$newstitle=$_POST['newstitle'];
		$newstype=$_POST['newstype'];
		$newsimg=$_POST['newsimg'];
		$newstime=$_POST['newstime'];
		$newssrc=$_POST['newssrc'];

		$sql = "INSERT INTO `news` (`newstype`,`newstitle`,`newsimg`,`newstime`,`newssrc`) VALUES('{$newstype}','{$newstitle}','{$newsimg}','{$newstime}','{$newssrc}')";
		mysqli_query($link,"SET NAMES utf8");
		$result = mysqli_query($link,$sql);
		echo json_encode(array("insert"=>"ok"));
	}else{
		echo json_encode(array("database error"=>"数据库连接不成功！"));
	}
	mysqli_close($link);
?>