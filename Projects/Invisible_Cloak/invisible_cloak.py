import cv2
import numpy as np

# Initialize the webcam or capture video
cap = cv2.VideoCapture(0)

# Load the background image
background = cv2.imread('Images/pic2.jpg')

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Convert the frame to HSV color space
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Define the range of color for the cloak (green color in this example)
    lower_green = np.array([40, 40, 40])
    upper_green = np.array([80, 255, 255])

    # Create a mask for the cloak color
    mask = cv2.inRange(hsv, lower_green, upper_green)

    # Perform morphological operations to clean the mask
    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

    # Invert the mask
    mask_inv = cv2.bitwise_not(mask)

    # Extract the cloak from the frame
    cloak = cv2.bitwise_and(frame, frame, mask=mask_inv)

    # Extract the background region from the background image
    background_region = cv2.bitwise_and(background, background, mask=mask)

    # Combine the cloak and background region
    result = cv2.add(cloak, background_region)

    # Display the result
    cv2.imshow("Invisible Cloak", result)

    if cv2.waitKey(1) == 27:  # Press 'Esc' to exit
        break

cap.release()
cv2.destroyAllWindows()
