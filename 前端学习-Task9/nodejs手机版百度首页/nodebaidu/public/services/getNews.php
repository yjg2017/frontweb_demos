<?php
	require_once('mysqlHelper.php');
	if($link){
		$newstype = $_GET['newstype'];
		
		if($newstype){
			$sql = "SELECT * FROM `news` WHERE `newstype`='{$newstype}' order by `newstime` desc";
			mysqli_query($link,"SET NAMES utf8");
			$result = mysqli_query($link,$sql);
			$senddata=array();
			while($row = mysqli_fetch_assoc($result)){
				array_push($senddata, array(
						'id'=>$row['id'],
						'newstype'=>$row['newstype'],
						'newstitle'=>$row['newstitle'],
						'newsimg'=>$row['newsimg'],
						'newstime'=>$row['newstime'],
						'newssrc'=>$row['newssrc'],
					));
			}
			echo json_encode($senddata);
		}else{
			$sql = "SELECT * FROM `news`  order by `newstime` desc";
			mysqli_query($link,"SET NAMES utf8");
			$result = mysqli_query($link,$sql);
			$senddata=array();
			while($row = mysqli_fetch_assoc($result)){
				array_push($senddata, array(
						'id'=>$row['id'],
						'newstype'=>$row['newstype'],
						'newstitle'=>$row['newstitle'],
						'newsimg'=>$row['newsimg'],
						'newstime'=>$row['newstime'],
						'newssrc'=>$row['newssrc'],
					));
			}
			echo json_encode($senddata);
		}
		
		
	}else{
		echo json_encode(array('数据库错误:'=>'连接不成功！'));
	}
	mysqli_close($link);
?>