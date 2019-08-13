<?php
	
	//$_REQ = json_decode(file_get_contents("php://input"));
	header('Content-type: application/json');

  $_REQ=$_GET;
  if($_REQ[action] == 'price'){
    $resp=array();
    $shapes = json_decode(file_get_contents("./base.json"));
    if ($shapes[$_REQ['brand']] && $shapes[$_REQ['brand']][$_REQ['type']] ) {
      //$resp = array( minX=>99999999, minY=>99999999, maxX=>0, maxY=>0 );
      $shape = $shapes[$_REQ['brand']][$_REQ['type']];
      $resp = array(
        minX => ($shape[1][0] < $shape[2][0] ? $shape[1][0] : $shape[2][0]),
        maxX => ($shape[3][0] > $shape[4][0] ? $shape[3][0] : $shape[4][0]),
        minY => ($shape[1][1] < $shape[4][1] ? $shape[1][1] : $shape[4][1]),
        maxY => ($shape[2][1] > $shape[3][1] ? $shape[2][1] : $shape[3][1])
      );
      $tri = getTriangle( $shape , array($_REQ['x'], $_REQ['y']));
      $resp[price] = ceil(TriangleIterpolate($tri, array($_REQ['x'],$_REQ['y']))*1.2305);
    }
    else
      $resp[price] = 0;
    
    
    
    echo json_encode($resp);  
  }

function getTriangle($shape, $point){
  $max = count($shape) - 1;
  for ($i=1; $i<$max; $i++){
    if (isInTriangle(array($shape[0],$shape[$i+1],$shape[$i]),$point))
      return array($shape[0],$shape[$i+1],$shape[$i]);
  }
  if (isInTriangle(array($shape[0],$shape[1],$shape[4]),$point))
    return array($shape[0],$shape[1],$shape[4]);
}

function isInTriangle($triangle, $point){
  list($x1,$y1) = $triangle[0];
  list($x2,$y2) = $triangle[1];
  list($x3,$y3) = $triangle[2];
  list($tx,$ty) =   $point;
  
  $a=($tx-$x1)*($y1-$y2)-($ty-$y1)*($x1-$x2);
  $b=($tx-$x2)*($y2-$y3)-($ty-$y2)*($x2-$x3);
  $c=($tx-$x3)*($y3-$y1)-($ty-$y3)*($x3-$x1);
  if ($a>=0 && $b>=0 && $c >=0)
    return true;
  return false;
}

function TriangleIterpolate($triangle, $point){
  list($x1,$y1,$z1) = $triangle[0];
  list($x2,$y2,$z2) = $triangle[1];
  list($x3,$y3,$z3) = $triangle[2];
  list($x,$y) = $point;
  $d  = abs (getDet3( array( array( $x1, $x2, $x3), array( $y1, $y2, $y3) ) ));
  $d1 = abs (getDet3( array( array(  $x, $x2, $x3), array(  $y, $y2, $y3) ) ));
  $d2 = abs (getDet3( array( array( $x1,  $x, $x3), array( $y1,  $y, $y3) ) ));
  $a = $d1/$d;
  $b = $d2/$d;
  $g = 1-$a-$b;
  return ( $a*$z1 + $b*$z2 + $g*$z3 );
}

function getDet3($matrix){
  list($a21, $a22, $a23) = $matrix[0];
  list($a31, $a32, $a33) = $matrix[1];
  return ( ($a22*$a33-$a23*$a32)-($a21*$a33-$a23*$a31)+($a21*$a32-$a22*$a31) );
} 

?>