import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import animation

# Create a 3D chessboard grid
size = 8
x, y = np.meshgrid(np.arange(size), np.arange(size))
z = np.zeros((size, size))
colors = np.zeros((size, size), dtype=int)

for i in range(size):
    for j in range(size):
        if (i + j) % 2 == 0:
            colors[i][j] = 1  # Set color to white

# Create a figure
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Define colors for black and white squares
colors_list = ['green', 'pink']

# Create the chessboard with custom colors
for i in range(size):
    for j in range(size):
        square_color = colors_list[colors[i][j]]
        ax.bar3d(i, j, 0, 1, 1, 0.1, color=square_color, shade=True)

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')

# Customize the view angle and add some lighting
ax.view_init(elev=20, azim=30)

# Add animation (for demonstration purposes)
def animate(frame):
    ax.view_init(elev=20, azim=30 + frame)
    return fig,

ani = animation.FuncAnimation(fig, animate, frames=360, interval=50, blit=True)

plt.show()
