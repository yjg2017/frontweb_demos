<?php
	header("Content-type:application/json;charset=utf-8");
	require_once('mysqlHelper.php');
	if($link){
		//更新新闻
		$newstitle=$_POST['newstitle'];
		$newstype=$_POST['newstype'];
		$newsimg=$_POST['newsimg'];
		$newstime=$_POST['newstime'];
		$newssrc=$_POST['newssrc'];
		$newsid=$_POST['newsid'];
		$sql = "UPDATE `news` SET `newstype`='{$newstype}',`newstitle`='{$newstitle}',`newsimg`='{$newsimg}',`newstime`='{$newstime}',`newssrc`='{$newssrc}' WHERE `id`={$newsid}";
		mysqli_query($link,"SET NAMES utf8");
		$result = mysqli_query($link,$sql);
		echo json_encode(array("update"=>"ok"));
	}else{
		echo json_encode(array("database error"=>"数据库连接不成功！"));
	}
	mysqli_close($link);
?>