

class lowpassfilter:

    def __init__(self,RC):
        "use RC for tuning the smoothmness"
        self.RC=RC
        self.x_old=0
        self.y_old=0
        self.z_old=0

    def filter(self,x,y,z,dt):
        "return the low pass filtered valus -dt delta time current step"
        k=dt / (self.RC + dt)
        res_x= self.x_old + k * (x - self.x_old)
        res_y= self.y_old + k * (y - self.y_old)
        res_z= self.z_old + k * (z - self.z_old)
        self.x_old=res_x
        self.y_old=res_y
        self.z_old=res_z
        return res_x,res_y,res_z
