	
public var maxHealth = 100;
public var health = 100;
public var armorLevel = 0;

var speed : float = 6.0;
var jumpSpeed : float = 8.0;
var gravity : float = 20.0;
var moveHorizontal;
var moveVertical;
var lookSpeed = 10;
var moveDirection : Vector3 = Vector3.zero;


private function leftRight() {
    if (Input.GetKey(KeyCode.A)) {
        moveHorizontal = -1;
    } else if (Input.GetKey(KeyCode.D)) {
        moveHorizontal = 1;
    } else {
        moveHorizontal = 0;
    }
    
    return moveHorizontal;        
}

private function upDown() {
    if (Input.GetKey(KeyCode.S)) {
        moveVertical = -1;
    } else if (Input.GetKey(KeyCode.W)) {
        moveVertical = 1;
    } else {
        moveVertical = 0;
    }
    
    return moveVertical;        
}


function Update() {
    //walking
    var controller : CharacterController = GetComponent.<CharacterController>();
    if (controller.isGrounded) {
        moveDirection = Vector3(leftRight(), 0, upDown());
        moveDirection = GameObject.Find("Plane").transform.TransformDirection(moveDirection);
        moveDirection *= speed;

         //jumping
        if (Input.GetButton ("Jump")) {
            moveDirection.y = jumpSpeed;
        }

        //health inventory
        if (Input.GetKeyDown(KeyCode.Q) && inventory.healthPacks > 0 && health != maxHealth) {
            inventory.healthPacks--;
            Debug.Log(inventory.healthPacks);
            
            if (maxHealth - health >= healthPackS.heal) {
                health += healthPackS.heal;
            } else {
                health = maxHealth;
            }
        } else if (Input.GetKeyDown(KeyCode.Q) && inventory.healthPacks == 0) {
            Debug.Log("No health packs");
        }

        //looking at cursor
        var playerPlane = new Plane(Vector3.up, transform.position);
        var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
        var hitdist = 0.0;
        if (playerPlane.Raycast(ray, hitdist)) {
            var targetPoint = ray.GetPoint(hitdist);
            var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
            transform.rotation = Quaternion.Slerp(
                transform.rotation, 
                targetRotation, 
                speed * Time.deltaTime
            );
        }

    }

    // Apply gravity
    moveDirection.y -= gravity * Time.deltaTime;

    // Move the controller
    controller.Move(moveDirection * Time.deltaTime);
}
